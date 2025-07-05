/**
 * @swagger
 * tags:
 *   name: user
 *   description: Endpoints para gerenciamento de usuários
 */

/**
 * @swagger
 * /user:
 *   post:
 *     tags: [user]
 *     summary: Criar novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Nome do usuário"
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 description: "Email do usuário"
 *                 example: "joao@gmail.com"
 *               password:
 *                 type: string
 *                 description: "Senha do usuário"
 *                 example: "QWEasd123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *   get:
 *     tags: [user]
 *     summary: Listar todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags: [user]
 *     summary: Buscar usuário por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *   put:
 *     tags: [user]
 *     summary: Atualizar usuário
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
 *                 description: "Nome do usuário"
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 description: "Email do usuário"
 *                 example: "joao@gmail.com"
 *               password:
 *                 type: string
 *                 description: "Senha do usuário"
 *                 example: "QWEasd123456"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *   delete:
 *     tags: [user]
 *     summary: Excluir usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 */

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', userController.createUsers);
router.post('/login', userController.login);
router.get('/', userController.findAllUsers);
router.put('/:id', userController.updateUsers);
router.delete('/:id', userController.deleteUsers);

module.exports = router;
