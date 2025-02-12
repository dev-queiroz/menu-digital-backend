import { Router } from "express";
import * as pedidosController from "../controllers/pedidosController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { pedidoSchema } from "../utils/validators"; // Defina o schema de pedidos se desejar validação

const router = Router();

/**
 * Cria um pedido para uma sessão ativa.
 * Requer autenticação (usuário deve estar logado).
 */
router.post(
  "/",
  authMiddleware,
  validationMiddleware(pedidoSchema),
  pedidosController.criarPedido
);

/**
 * Altera o status de um pedido.
 * Requer autenticação.
 */
router.patch("/", authMiddleware, pedidosController.alterarStatusPedido);

export default router;
