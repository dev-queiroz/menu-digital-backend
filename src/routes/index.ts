import { Router } from "express";
import menuRoutes from "./menuRoutes";
import orderRoutes from "./orderRoutes";
import paymentRoutes from "./paymentRoutes";
import reservationRoutes from "./reservationRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/api", menuRoutes);
router.use("/api", orderRoutes);
router.use("/api", paymentRoutes);
router.use("/api", reservationRoutes);
router.use("/api", userRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

export default router;
