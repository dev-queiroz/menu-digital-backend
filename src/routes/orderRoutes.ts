import { Router } from "express";
import { authMiddleware, validateRequest, requireRole } from "../middlewares";
import { createOrder, updateOrderStatus } from "../controllers/orderController";

const router = Router();

router.post(
  "/orders",
  authMiddleware,
  validateRequest([{ field: "items", type: "string", required: true }]),
  createOrder
);

router.patch(
  "/orders/:id/status",
  authMiddleware,
  requireRole(["staff", "admin"]),
  validateRequest([{ field: "status", type: "string", required: true }]),
  updateOrderStatus
);

export default router;
