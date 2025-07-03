/**
 * @swagger
 * tags:
 *   name: product
 *   description: Endpoints para gerenciamento de product
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /product:
 *   post:
 *     tags: [product]
 *     summary: Criar novo produto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *                 example: X-Salada
 *               price:
 *                 type: number
 *                 description: Preço do produto
 *                 example: 10.00
 *               idCategory:
 *                 type: integer
 *                 description: ID da categoria (opcional)
 *                 example: 1
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *   get:
 *     tags: [product]
 *     summary: Listar todos os product
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de product retornada com sucesso
 */

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     tags: [product]
 *     summary: Buscar produto por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso
 *   put:
 *     tags: [product]
 *     summary: Atualizar produto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *                 example: X-Burguer
 *               price:
 *                 type: number
 *                 description: Preço do produto
 *                 example: 12.00
 *               idCategory:
 *                 type: integer
 *                 description: ID da categoria (opcional)
 *                 example: 2
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *   delete:
 *     tags: [product]
 *     summary: Excluir produto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 */

const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.findAllProducts);
router.post("/", productController.createProducts);
router.put("/:id", productController.updateProducts);
router.delete("/:id", productController.deleteProducts);

module.exports = router;
