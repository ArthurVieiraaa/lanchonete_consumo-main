Projeto de API - Gerenciamento de Projetos, Tarefas e Usuários
Este projeto é uma API RESTful construída com Node.js, Express e Sequelize ORM para gerenciar Projetos, Tarefas e Usuários.

Tecnologias usadas:
- Node.js
- Express
- Sequelize
- MySQL
- bcrypt (para criptografia de senhas)
- JWT (para autenticação)
- dotenv (para variáveis de ambiente)

Funcionalidades:
📁 CRUD de Usuários (com senhas criptografadas)
📁 CRUD de Projetos
📁 CRUD de Tarefas
🔒 Autenticação de usuários via token JWT
📚 Associação entre tarefas, projetos e usuários

Estrutura das pastas:
├── config
│   └── database.js
├── controllers
│   ├── projectController.js
│   ├── taskController.js
│   └── userController.js
├── models
│   ├── project.js
│   ├── task.js
│   └── user.js
├── .env
├── server.js
└── README.md

Variáveis de ambiente:
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_NAME=dbJS
JWT_SECRET=
PORT=3000

Como instalar e rodar o projeto localmente

Clone o repositório:
git clone https://github.com/seu-usuario/seu-repositorio.git

Instale as dependências:
npm install express sequelize mysql2 bcrypt jsonwebtoken dotenv

Configure o banco de dados:
Certifique-se de ter o MySQL instalado e rodando.
Crie o banco de dados com o nome que colocou no .env.

sql
CREATE DATABASE db;

Execute as migrações (opcional se usar sync automático):
O Sequelize criará as tabelas automaticamente ao iniciar a aplicação.

Inicie o servidor:
npm start
ou
node server.js

Endpoints disponíveis

Usuários
Método	Rota	    Descrição
POST	/users	    Criar usuário
GET	    /users	    Listar todos usuários
PUT	    /users/:id	Atualizar usuário
DELETE	/users/:id	Deletar usuário

Projetos
Método	Rota	        Descrição
POST	/projects	    Criar projeto
GET	    /projects	    Listar todos projetos
GET	    /projects/:id	Buscar projeto por ID
PUT	    /projects/:id	Atualizar projeto
DELETE	/projects/:id	Deletar projeto

Tarefas
Método	Rota	    Descrição
POST	/tasks	    Criar tarefa
GET	    /tasks	    Listar todas tarefas
GET	    /tasks/:id	Buscar tarefa por ID
PUT	    /tasks/:id	Atualizar tarefa
DELETE	/tasks/:id	Deletar tarefa
Autenticação

Método	Rota	Descrição
POST	/login	Login do usuário (gera token JWT)

Autenticação
Após o login (/login), o usuário recebe um Token JWT.
Esse token deve ser enviado no header das requisições protegidas, usando:
Authorization: Bearer seu_token_aqui

Autor: Fernando Ventura da Silva.