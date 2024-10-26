const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const PedidoItem = sequelize.define('pedidoItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  cantidad: Sequelize.INTEGER
});

module.exports = PedidoItem;