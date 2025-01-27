const express = require("express");
const { listarPedidosAtivos, atualizarStatusPedido } = require("../controllers/pedidoController");
const auth = require("../middlewares/auth");
const garcomController = require("../controllers/garcomController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Garçons
 *   description: Operações relacionadas aos garçons
 */

// Rotas para garçons
router.get("/ativos", auth.garcom, listarPedidosAtivos);
router.put("/:pedidoId/status", auth.garcom, atualizarStatusPedido);

/**
 * @swagger
 * /garcom:
 *   post:
 *     summary: Cria um novo garçom
 *     tags: [Garçons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               cargo:
 *                 type: string
 *             required:
 *               - nome
 *               - email
 *               - senha
 *     responses:
 *       201:
 *         description: Garçom criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Garcom'
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro no servidor
 */
router.post("/", auth.admin, garcomController.criarGarcom);

/**
 * @swagger
 * /garcom:
 *   get:
 *     summary: Retorna todos os garçons
 *     tags: [Garçons]
 *     responses:
 *       200:
 *         description: Lista de garçons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Garcom'
 */
router.get("/", auth.admin, garcomController.listarGarcons);

router.put("/:id/senha", auth.admin, garcomController.alterarSenhaGarcom);
router.delete("/:id", auth.admin, garcomController.desativarGarcom);

module.exports = router; 