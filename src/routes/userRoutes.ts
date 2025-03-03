import { Router } from "express";
import { validateRequest } from "../middlewares";
import { register, login } from "../controllers/userController";

const router = Router();

router.post(
  "/users/register",
  validateRequest([
    { field: "email", type: "email", required: true },
    { field: "password", type: "string", required: true, min: 6 },
    { field: "role", type: "string", required: false },
  ]),
  register
);

router.post(
  "/users/login",
  validateRequest([
    { field: "email", type: "email", required: true },
    { field: "password", type: "string", required: true },
  ]),
  login
);

export default router;
