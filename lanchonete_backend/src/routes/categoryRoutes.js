/**
 * @swagger
 * tags:
 *   name: category
 *   description: Endpoints para gerenciamento de category
 */

/**
 * @swagger
 * /category:
 *   post:
 *     tags: [category]
 *     summary: Criar nova categoria
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameCategory:
 *                 type: string
 *                 description: Nome da categoria
 *                 example: Lanches
 *               description:
 *                 type: string
 *                 description: Descrição da categoria
 *                 example: Lanches rápidos e porções
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *   get:
 *     tags: [category]
 *     summary: Listar todas as category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de category retornada com sucesso
 */

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags: [category]
 *     summary: Buscar categoria por ID
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
 *         description: Categoria encontrada com sucesso
 *   put:
 *     tags: [category]
 *     summary: Atualizar categoria
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
 *               nameCategory:
 *                 type: string
 *                 description: Nome da categoria
 *                 example: Bebidas
 *               description:
 *                 type: string
 *                 description: Descrição da categoria
 *                 example: Refrigerantes e sucos
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *   delete:
 *     tags: [category]
 *     summary: Excluir categoria
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
 *         description: Categoria excluída com sucesso
 */


const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.findAllCategories);
router.post('/', categoryController.createCategories);
router.put('/:id', categoryController.updateCategories);
router.delete('/:id', categoryController.deleteCategories);

module.exports = router;