import { supabase } from "../config/database";
import { createOrder, Order, updateOrderStatus } from "../models/order";
import { updateStock } from "./inventoryService";
import {
  notifyCustomerOrderUpdate,
  notifyStaffNewOrder,
} from "./notificationService";
import { logger } from "../utils";

interface OrderItemInput {
  variant_id: number;
  quantity: number;
}

export const placeOrder = async (
  userId: string,
  items: OrderItemInput[]
): Promise<Order> => {
  try {
    for (const item of items) {
      const { data: variant, error } = await supabase
        .from("menu_variants")
        .select("stock")
        .eq("id", item.variant_id)
        .single();
      if (error || !variant || variant.stock < item.quantity) {
        throw new Error(`Insufficient stock for variant ${item.variant_id}`);
      }
    }

    const order = await createOrder(userId, items);

    for (const item of items) {
      await updateStock(item.variant_id, -item.quantity);
    }

    logger.info("Order placed successfully", { orderId: order.id });
    return order;
  } catch (error) {
    logger.error("Error placing order", error);
    throw error;
  }
};

export const updateOrder = async (
  orderId: number,
  status: Order["status"]
): Promise<Order> => {
  const order = await updateOrderStatus(orderId, status);
  await notifyCustomerOrderUpdate(order);
  if (status === "pending") await notifyStaffNewOrder(order);
  return order;
};
