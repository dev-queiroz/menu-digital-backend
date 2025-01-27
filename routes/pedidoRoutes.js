const express = require("express");
const pedidoController = require("../controllers/pedidoController");
const auth = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Operações relacionadas aos pedidos
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mesaId:
 *                 type: integer
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     quantidade:
 *                       type: integer
 *             required:
 *               - mesaId
 *               - itens
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro no servidor
 */
router.post("/", auth.mesa, pedidoController.criarPedido);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Retorna todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 */
router.get("/", auth.garcom, pedidoController.listarPedidos);

router.put("/:pedidoId/status", auth.garcom, pedidoController.atualizarStatusPedido);

// Adicione outras rotas conforme necessário

module.exports = router;
