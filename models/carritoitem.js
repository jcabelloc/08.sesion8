const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const CarritoItem = sequelize.define('carritoItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  cantidad: Sequelize.INTEGER
});

module.exports = CarritoItem;