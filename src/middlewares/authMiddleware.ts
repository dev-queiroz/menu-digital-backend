import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/database";
import { User } from "../models/user";
import { responseError } from "../utils";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return responseError(res, 401, "No token provided");
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      return responseError(res, 401, "Invalid or expired token");
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, email, role, name, created_at")
      .eq("id", data.user.id)
      .single();
    if (userError) throw userError;

    req.user = userData as User;
    next();
  } catch (err) {
    return responseError(res, 500, "Authentication error", err);
  }
};

export const requireRole = (roles: User["role"][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return responseError(res, 403, "Insufficient permissions");
    }
    next();
  };
};
