import { supabase } from "../config/database";

export interface Payment {
  id: number;
  order_id: number;
  stripe_payment_id: string;
  amount: number;
  status: "pending" | "succeeded" | "failed";
  created_at: string;
}

export const createPayment = async (
  orderId: number,
  stripePaymentId: string,
  amount: number
): Promise<Payment> => {
  const { data, error } = await supabase
    .from("payments")
    .insert([
      {
        order_id: orderId,
        stripe_payment_id: stripePaymentId,
        amount,
        status: "pending",
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updatePaymentStatus = async (
  paymentId: number,
  status: Payment["status"]
): Promise<Payment> => {
  const { data, error } = await supabase
    .from("payments")
    .update({ status })
    .eq("id", paymentId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
