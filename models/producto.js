const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Producto = sequelize.define('producto', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    nombre: Sequelize.STRING,
    precio: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    urlImagen: {
      type: Sequelize.STRING,
      allowNull: false
    },
    descripcion: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  
  module.exports = Producto;
  