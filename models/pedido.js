const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Pedido = sequelize.define('pedido', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Pedido;