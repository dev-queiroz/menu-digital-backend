const express = require("express");
const mesaController = require("../controllers/mesaController");
const auth = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mesas
 *   description: Operações relacionadas às mesas
 */

/**
 * @swagger
 * /mesas:
 *   post:
 *     summary: Cria uma nova mesa
 *     tags: [Mesas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: integer
 *               capacidade:
 *                 type: integer
 *             required:
 *               - numero
 *               - capacidade
 *     responses:
 *       201:
 *         description: Mesa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mesa'
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro no servidor
 */
router.post("/", auth.admin, mesaController.criarMesa);

/**
 * @swagger
 * /mesas:
 *   get:
 *     summary: Retorna todas as mesas
 *     tags: [Mesas]
 *     responses:
 *       200:
 *         description: Lista de mesas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mesa'
 */
router.get("/", auth.admin, mesaController.listarMesas);

router.put("/:id/disponibilidade", auth.admin, mesaController.atualizarDisponibilidadeMesa);

// Adicione outras rotas conforme necessário

module.exports = router;
