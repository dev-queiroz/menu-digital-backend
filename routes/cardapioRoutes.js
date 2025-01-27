const express = require("express");
const cardapioController = require("../controllers/cardapioController");
const auth = require("../middlewares/auth");
const { cacheMiddleware } = require("../middlewares/cache");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cardápio
 *   description: Operações relacionadas ao cardápio
 */

/**
 * @swagger
 * /cardapio:
 *   post:
 *     summary: Cria um novo item no cardápio
 *     tags: [Cardápio]
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
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               disponivel:
 *                 type: boolean
 *             required:
 *               - nome
 *               - preco
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro no servidor
 */
router.post("/", auth.admin, cardapioController.criarItem);

/**
 * @swagger
 * /cardapio:
 *   get:
 *     summary: Retorna todos os itens do cardápio
 *     tags: [Cardápio]
 *     responses:
 *       200:
 *         description: Lista de itens do cardápio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get("/", auth.admin, cardapioController.listarItens);

/**
 * @swagger
 * /cardapio/{id}:
 *   put:
 *     summary: Atualiza um item do cardápio
 *     tags: [Cardápio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               disponivel:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put("/:id", auth.admin, cardapioController.atualizarItem);

/**
 * @swagger
 * /cardapio/{id}:
 *   delete:
 *     summary: Remove um item do cardápio
 *     tags: [Cardápio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete("/:id", auth.admin, cardapioController.deletarItem);

// Rota pública (com cache)
router.get("/", cacheMiddleware(600), cardapioController.listarItens);

// Rotas para gerentes
router.put("/:id/disponibilidade", auth.gerente, cardapioController.alterarDisponibilidade);

module.exports = router; 