import { Request, Response, NextFunction } from "express";
import { logger, responseError } from "../utils";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Logar erros para monitoramento
  logger.error(`${req.method} ${req.url} failed`, {
    status,
    message,
    stack: err.stack,
  });

  responseError(
    res,
    status,
    message,
    process.env.NODE_ENV === "development" ? err.stack : undefined
  );
};
