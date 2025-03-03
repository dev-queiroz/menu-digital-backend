import { Request, Response } from "express";
import { fetchMenuItems, fetchMenuItemById } from "../models/menuItem";
import { responseSuccess, responseError } from "../utils";

export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const menu = await fetchMenuItems();
    responseSuccess(res, 200, "Menu items retrieved successfully", menu);
  } catch (err) {
    responseError(res, 500, "Error fetching menu items", err);
  }
};

export const getMenuItemById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return responseError(res, 400, "Invalid menu item ID");
    }

    const item = await fetchMenuItemById(id);
    if (!item) {
      return responseError(res, 404, "Menu item not found");
    }
    responseSuccess(res, 200, "Menu item retrieved successfully", item);
  } catch (err) {
    responseError(res, 500, "Error fetching menu item", err);
  }
};
