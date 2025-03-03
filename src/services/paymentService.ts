import { supabase } from "../config/database";
import { stripe } from "../config/stripe";
import { Order } from "../models/order";
import { createPayment, updatePaymentStatus } from "../models/payment";
import { logger } from "../utils";

export const createPaymentIntent = async (
  order: Order,
  amount: number
): Promise<string> => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      metadata: { order_id: order.id.toString() },
    });

    const payment = await createPayment(order.id, paymentIntent.id, amount);
    logger.info("PaymentIntent created", { paymentId: payment.id });
    if (!paymentIntent.client_secret) {
      throw new Error("Client secret is null");
    }
    return paymentIntent.client_secret;
  } catch (error) {
    logger.error("Error creating PaymentIntent", error);
    throw error;
  }
};

export const confirmPayment = async (
  paymentIntentId: string
): Promise<void> => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status === "succeeded") {
      await updatePaymentStatus(
        (
          await supabase
            .from("payments")
            .select("id")
            .eq("stripe_payment_id", paymentIntentId)
            .single()
        ).data!.id,
        "succeeded"
      );
      logger.info("Payment confirmed", { paymentIntentId });
    } else {
      logger.warn("Payment not succeeded", { status: paymentIntent.status });
      throw new Error("Payment not completed");
    }
  } catch (error) {
    logger.error("Error confirming payment", error);
    throw error;
  }
};
