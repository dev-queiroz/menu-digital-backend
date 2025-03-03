import { Router } from "express";
import { authMiddleware, validateRequest } from "../middlewares";
import {
  initiatePayment,
  confirmPaymentIntent,
} from "../controllers/paymentController";

const router = Router();

router.post(
  "/payments/initiate",
  authMiddleware,
  validateRequest([
    { field: "orderId", type: "number", required: true },
    { field: "amount", type: "number", required: true, min: 1 },
  ]),
  initiatePayment
);

router.post(
  "/payments/confirm",
  authMiddleware,
  validateRequest([
    { field: "paymentIntentId", type: "string", required: true },
  ]),
  confirmPaymentIntent
);

export default router;
