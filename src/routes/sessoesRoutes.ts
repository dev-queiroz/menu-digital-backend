import { Router } from "express";
import * as sessoesController from "../controllers/sessoesController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/**
 * Inicia uma sessão para uma mesa.
 * Geralmente, esse endpoint é acessado pelo cliente (por exemplo, após escanear o QR Code).
 */
router.post("/iniciar", sessoesController.iniciarSessao);

/**
 * Finaliza a sessão de uma mesa.
 * Apenas garçom ou admin podem encerrar a sessão.
 * Requer autenticação.
 */
router.post("/finalizar", authMiddleware, sessoesController.finalizarSessao);

/**
 * Permite que o cliente chame o garçom para finalizar a mesa.
 * Este endpoint pode ser público ou exigir autenticação, dependendo da sua lógica.
 */
router.post("/chamar-garcom", sessoesController.chamarGarcom);

export default router;
