const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class UserController {
    static async createUsers(req, res) {
        const { name, email, password } = req.body;
        try {
            // const senhaCriptografada = await bcrypt.hash(password, 10
            const user = await User.create({
                name,
                email,
                password
            });

            res.status(201).json({ message: 'Usuário criado com sucesso', user });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário', detalhes: error.message });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        // const validPassword = await bcrypt.compare(password, user.password);

        if (password == user.password) {
            return console.log('Senha inválida');
        }

        // if (!validPassword) return res.status(401).json({ error: "Senha incorreta" });

        // Aqui você gera o token JWT
        const token = jwt.sign(
            { id: user.idUser, email: user.email },
            process.env.JWT_SECRET,       // sua chave secreta (definida no .env)
            { expiresIn: '1h' }           // token válido por 1 hora (ajuste se quiser)
        );

        res.status(200).json({ 
            token,
            user: { id: user.idUser, name: user.name, email: user.email } 
        });
        } catch (error) {
            console.error('Erro no login:', error);
             res.status(500).json({ error: 'Erro ao realizar login', detalhes: error.message });
        }
    }
    
    static async findAllUsers(req, res) {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] } // Campo correto
            });

            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar usuários', detalhes: error.message });
        }
    }
    
    static async updateUsers(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;

        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            user.name = name;
            user.email = email;

            if (password) {
                const senhaCriptografada = await bcrypt.hash(password, 10);
                user.password = senhaCriptografada;
            }

            await user.save();

            res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar usuário', detalhes: error.message });
        }
    }
    
    static async deleteUsers(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            await user.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar usuário', detalhes: error.message });
        }
    }
}

module.exports = UserController;
