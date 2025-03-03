import { supabase } from "../config/database";

export interface Order {
  id: number;
  user_id: string;
  status: "pending" | "preparing" | "ready" | "delivered" | "canceled";
  total_amount: number;
  created_at: Date;
  updated_at: Date | null;
}

export interface OrderItem {
  id: number;
  order_id: number;
  variant_id: number;
  quantity: number;
  price: number;
}

export const createOrder = async (
  userId: string,
  items: { variant_id: number; quantity: number }[]
): Promise<Order> => {
  const { data, error } = await supabase
    .from("orders")
    .insert([{ user_id: userId, status: "pending", total_amount: 0 }])
    .select()
    .single();
  if (error) throw error;

  const orderItems = items.map((item) => ({
    order_id: data.id,
    variant_id: item.variant_id,
    quantity: item.quantity,
  }));
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);
  if (itemsError) throw itemsError;

  return data;
};

export const updateOrderStatus = async (
  orderId: number,
  status: Order["status"]
): Promise<Order> => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
