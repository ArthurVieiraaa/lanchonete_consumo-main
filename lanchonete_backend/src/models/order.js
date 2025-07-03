const Sequelize = require('sequelize');
const db = require('../config/db');

const Order = db.define ('Order', {
    idOrder: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = Order;