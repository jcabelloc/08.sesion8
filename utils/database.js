const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://jcabelloc:secreto@cluster0.m3us8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
    .then(client => {
      console.log('Conexion establecida!');
      _db = client.db('tiendaonline');
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};



const getDb = () => {
    if (_db) {
      return _db;
    }
    throw 'Base de datos no encontrada!';
  };
  
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;