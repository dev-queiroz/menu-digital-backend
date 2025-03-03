import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

if (!stripeSecretKey) {
  throw new Error(
    "Stripe Secret Key must be provided in environment variables"
  );
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

export const publishableKey = stripePublishableKey || "";

export const testStripeConnection = async () => {
  try {
    const balance = await stripe.balance.retrieve();
    console.log("Stripe connection successful:", balance);
    return true;
  } catch (err) {
    console.error("Stripe connection failed:", err);
    return false;
  }
};

export type StripeClient = typeof stripe;
