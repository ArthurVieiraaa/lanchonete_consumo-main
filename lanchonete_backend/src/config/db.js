    require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env')});

    const Sequelize = require('sequelize');

    const db = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            
            {
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT || 'mysql',
                port: process.env.DB_PORT
            }
        );
    
    db.authenticate()
    .then(() => console.log('Conectado ao MySQL'))

module.exports = db;