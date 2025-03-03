import { Router } from "express";
import { authMiddleware, validateRequest } from "../middlewares";
import { handlerCreateReservation } from "../controllers/reservationController";

const router = Router();

router.post(
  "/reservations",
  authMiddleware,
  validateRequest([
    { field: "date", type: "date", required: true },
    { field: "time", type: "string", required: true },
    { field: "numberOfPeople", type: "number", required: true, min: 1 },
  ]),
  handlerCreateReservation
);

export default router;
