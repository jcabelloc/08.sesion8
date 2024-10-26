const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;


class Usuario {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection('usuarios').insertOne(this);
  }

  static findById(idUsuario) {
    const db = getDb();
    return db
      .collection('usuarios')
      .findOne({ _id: mongodb.ObjectId.createFromHexString(idUsuario) })
      .then(usuario => {
        console.log(usuario);
        return usuario;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
module.exports = Usuario;