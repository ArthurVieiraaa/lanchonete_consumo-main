const Sequelize = require('sequelize');
const db = require('../config/db');

const Product = db.define ('Product', {
    idProduct: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    idCategory: {
        type: Sequelize.INTEGER
    },
});

module.exports = Product;