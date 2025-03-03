import { Request, Response, NextFunction } from "express";
import { responseError } from "../utils";

const rateLimitConfig = {
  windowMs: 15 * 60 * 1000,
  maxRequests: 100,
};

const requestCounts: Record<string, { count: number; resetTime: number }> = {};

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || "unknown";
  const now = Date.now();

  if (!requestCounts[ip] || now > requestCounts[ip].resetTime) {
    requestCounts[ip] = {
      count: 1,
      resetTime: now + rateLimitConfig.windowMs,
    };
  } else {
    requestCounts[ip].count += 1;
  }

  const remainingRequests =
    rateLimitConfig.maxRequests - requestCounts[ip].count;

  res.setHeader("X-RateLimit-Limit", rateLimitConfig.maxRequests);
  res.setHeader("X-RateLimit-Remaining", Math.max(0, remainingRequests));
  res.setHeader(
    "X-RateLimit-Reset",
    Math.floor(requestCounts[ip].resetTime / 1000)
  );

  if (requestCounts[ip].count > rateLimitConfig.maxRequests) {
    return responseError(res, 429, "Too Many Requests");
  }

  next();
};
