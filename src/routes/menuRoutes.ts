import { Router } from "express";
import { getMenuItems, getMenuItemById } from "../controllers/menuController";

const router = Router();

router.get("/menu", getMenuItems);
router.get("/menu/:id", getMenuItemById);

export default router;
