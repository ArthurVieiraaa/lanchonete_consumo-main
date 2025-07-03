/**
 * @swagger
 * tags:
 *   name: orderItem
 *   description: Endpoints para gerenciamento dos itens dos pedidos
 */

/**
 * @swagger
 * /orderItem:
 *   post:
 *     tags: [orderItem]
 *     summary: Adicionar item ao pedido
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idOrder:
 *                 type: integer
 *                 description: ID do pedido
 *                 example: 1
 *               idProduct:
 *                 type: integer
 *                 description: ID do produto
 *                 example: 2
 *               quantity:
 *                 type: integer
 *                 description: Quantidade do produto
 *                 example: 3
 *     responses:
 *       201:
 *         description: Item adicionado ao pedido com sucesso
 *   get:
 *     tags: [orderItem]
 *     summary: Listar todos os itens de todos os pedidos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de itens retornada com sucesso
 */

/**
 * @swagger
 * /orderItem/{id}:
 *   get:
 *     tags: [orderItem]
 *     summary: Buscar item de pedido por ID
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
 *         description: Item encontrado com sucesso
 *   put:
 *     tags: [orderItem]
 *     summary: Atualizar item de pedido
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
 *               idOrder:
 *                 type: integer
 *                 description: ID do pedido
 *                 example: 1
 *               idProduct:
 *                 type: integer
 *                 description: ID do produto
 *                 example: 2
 *               quantity:
 *                 type: integer
 *                 description: Quantidade do produto
 *                 example: 5
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *   delete:
 *     tags: [orderItem]
 *     summary: Excluir item de pedido
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
 *         description: Item excluído com sucesso
 */


const express = require('express');
const router = express.Router();

const orderItemController = require('../controllers/orderItemController');

router.post('/', orderItemController.createOrderItem);
router.get('/', orderItemController.findAllOrderItems);
router.put('/:id', orderItemController.updateOrderItem);
router.delete('/:id', orderItemController.deleteOrderItem);

module.exports = router;
