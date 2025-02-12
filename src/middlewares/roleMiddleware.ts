import { Request, Response, NextFunction } from "express";
import { Usuario } from "../models/usuarioModel";

/**
 * Middleware para verificar se o usuário autenticado possui um dos papéis permitidos.
 * @param allowedRoles Array de papéis permitidos (ex: ["admin", "garcom", "chef"])
 */

declare module "express-serve-static-core" {
  interface Request {
    user?: Usuario;
  }
}

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as Usuario;
    if (!user) {
      res.status(401).json({ error: "Usuário não autenticado." });
      return;
    }

    if (!allowedRoles.includes(user.tipo)) {
      res.status(403).json({ error: "Acesso negado." });
      return;
    }

    next();
  };
};
