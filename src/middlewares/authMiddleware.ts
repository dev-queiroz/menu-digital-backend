import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token de autenticação não fornecido." });
    return; // Impede o retorno de um valor explícito
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      tipo: string;
    };
    (req as any).user = decoded; // Anexa o usuário decodificado ao request
    next(); // Continua para o próximo middleware
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado." });
  }
};
