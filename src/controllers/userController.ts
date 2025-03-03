import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { responseSuccess, responseError } from "../utils";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return responseError(res, 400, "Email and password are required");
    }

    const user = await registerUser(email, password, role);
    responseSuccess(res, 201, "User registered successfully", user);
  } catch (err) {
    responseError(res, 500, "Error registering user", err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return responseError(res, 400, "Email and password are required");
    }

    const token = await loginUser({ email, password });
    responseSuccess(res, 200, "Login successful", { token });
  } catch (err) {
    responseError(res, 401, "Error logging in", err);
  }
};
