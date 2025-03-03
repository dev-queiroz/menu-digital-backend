import { Request, Response } from "express";
import { placeOrder, updateOrder } from "../services/orderService";
import { responseSuccess, responseError } from "../utils";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    if (!req.user) {
      return responseError(res, 401, "User not authenticated");
    }

    const order = await placeOrder(req.user.id, items);
    responseSuccess(res, 201, "Order created successfully", order);
  } catch (err) {
    responseError(res, 500, "Error creating order", err);
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (isNaN(orderId)) {
      return responseError(res, 400, "Invalid order ID");
    }
    if (
      !status ||
      !["pending", "preparing", "ready", "delivered", "canceled"].includes(
        status
      )
    ) {
      return responseError(res, 400, "Invalid status");
    }

    const updatedOrder = await updateOrder(orderId, status);
    responseSuccess(
      res,
      200,
      "Order status updated successfully",
      updatedOrder
    );
  } catch (err) {
    responseError(res, 500, "Error updating order status", err);
  }
};
