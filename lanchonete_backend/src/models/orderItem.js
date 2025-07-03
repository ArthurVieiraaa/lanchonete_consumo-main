const Sequelize = require('sequelize');
const db = require('../config/db');
const Product = require('./product')
const Order = require('./order')

const OrderItem = db.define ('OrderItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'idOrder'
        }
    },
    idProduct: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'idProduct'
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

OrderItem.belongsTo(Product, { foreignKey: 'idProduct', as: 'products' })
OrderItem.belongsTo(Order, { foreignKey: 'idOrder', as: 'orders' })

module.exports = OrderItem;