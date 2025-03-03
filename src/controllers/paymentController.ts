import { Request, Response } from "express";
import {
  createPaymentIntent,
  confirmPayment,
} from "../services/paymentService";
import { responseSuccess, responseError } from "../utils";

export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const { orderId, amount } = req.body;
    if (!req.user) {
      return responseError(res, 401, "User not authenticated");
    }
    if (!orderId || !amount || amount <= 0) {
      return responseError(res, 400, "Invalid order ID or amount");
    }

    const clientSecret = await createPaymentIntent(
      {
        id: orderId,
        user_id: req.user.id,
        status: "pending",
        total_amount: amount,
        created_at: new Date(),
        updated_at: new Date(),
      },
      amount
    );
    responseSuccess(res, 200, "Payment initiated successfully", {
      clientSecret,
    });
  } catch (err) {
    responseError(res, 500, "Error initiating payment", err);
  }
};

export const confirmPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId } = req.body;
    if (!paymentIntentId) {
      return responseError(res, 400, "PaymentIntent ID is required");
    }

    await confirmPayment(paymentIntentId);
    responseSuccess(res, 200, "Payment confirmed successfully");
  } catch (err) {
    responseError(res, 500, "Error confirming payment", err);
  }
};
