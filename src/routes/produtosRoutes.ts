// src/routes/produtosRoutes.ts
import { Router } from "express";
import * as produtosController from "../controllers/produtosController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import multer from "multer";
const router = Router();

/**

 * Lista todos os produtos (cardápio) – endpoint público.
 */
router.get("/", produtosController.listarProdutos);

/**
 * Cria um novo produto – apenas administradores.
 * Supondo que o upload de imagem seja feito via Multer, adicione o middleware de upload antes do validationMiddleware.
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  multer().single("imagem"),
  produtosController.criarProduto
);

/**
 * Outras operações (editar, excluir) podem ser adicionadas conforme necessário.
 */

export default router;
