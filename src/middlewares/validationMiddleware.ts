// src/middlewares/validationMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validationMiddleware = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      // Envia a resposta de erro e não retorna nada
      res
        .status(400)
        .json({ error: error.errors ? error.errors : error.message });
    }
  };
};
