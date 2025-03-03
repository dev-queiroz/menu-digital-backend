import { supabase } from "../config/database";
import { Order } from "../models/order";
import { logger } from "../utils";

export const notifyStaffNewOrder = async (order: Order): Promise<void> => {
  try {
    const channel = supabase.channel("staff_notifications");
    await channel.send({
      type: "broadcast",
      event: "new_order",
      payload: { order_id: order.id, status: order.status },
    });
    logger.info("Staff notified of new order", { orderId: order.id });
  } catch (error) {
    logger.error("Error notifying staff", error);
    throw error;
  }
};

export const notifyCustomerOrderUpdate = async (
  order: Order
): Promise<void> => {
  try {
    const channel = supabase.channel(`customer_${order.user_id}`);
    await channel.send({
      type: "broadcast",
      event: "order_update",
      payload: { order_id: order.id, status: order.status },
    });
    logger.info("Customer notified of order update", { orderId: order.id });
  } catch (error) {
    logger.error("Error notifying customer", error);
    throw error;
  }
};
