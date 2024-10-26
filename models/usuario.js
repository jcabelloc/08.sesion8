const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Usuario = sequelize.define('usuario', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nombre: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = Usuario;
