const express = require('express');
const db = require('./config/db');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger');
const cors = require('cors');

// Rotas
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const orderRouter = require('./routes/orderRoutes'); 
const orderItemRouter = require('./routes/orderItemRoutes');


dotenv.config(); // Carrega variáveis do .env

const app = express();
app.use(express.json());
app.use(cors());

console.log('Starting server...');

app.get('/', (req, res) => {
  res.send({ response: 'API RESTful Node.js com Sequelize está rodando 🚀' });
});

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/order', orderRouter); 
app.use('/orderItem', orderItemRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Conexão e sincronização com o banco de dados
db.sync()
  .then(() => {
    console.log('Banco de dados conectado com sucesso!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });
