/**
 * @swagger
 * tags:
 *   name: order
 *   description: Endpoints para gerenciamento de order
 */

/**
 * @swagger
 * /order:
 *   post:
 *     tags: [order]
 *     summary: Criar novo pedido
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: integer
 *                 description: ID do usuário que realizou o pedido
 *                 example: 1
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *   get:
 *     tags: [order]
 *     summary: Listar todos os order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de order retornada com sucesso
 */

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     tags: [order]
 *     summary: Buscar pedido por ID
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
 *         description: Pedido encontrado com sucesso
 *   put:
 *     tags: [order]
 *     summary: Atualizar pedido
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
 *               idUser:
 *                 type: integer
 *                 description: ID do usuário que realizou o pedido
 *                 example: 2
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *   delete:
 *     tags: [order]
 *     summary: Excluir pedido
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
 *         description: Pedido excluído com sucesso
 */



const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const OrderItemController = require('../controllers/orderItemController');

router.get('/', orderController.findAllOrders);
router.post('/', orderController.createOrders);
router.put('/:id', orderController.updateOrders);
router.delete('/:id', orderController.deleteOrders);

// OrderItem
router.post('/:idOrder/item', OrderItemController.createOrderItem)

module.exports = router;