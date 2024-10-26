const path = require('path');

const express = require('express');
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const tiendaRoutes = require('./routes/tienda')
const errorController = require('./controllers/error');
const sequelize = require('./utils/database');
const Producto = require('./models/producto');
const Usuario = require('./models/usuario');
const Carrito = require('./models/carrito');
const CarritoItem = require('./models/carritoitem');
const Pedido = require('./models/pedido');
const PedidoItem = require('./models/pedidoitem');

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    Usuario.findByPk(1)
        .then(usuario => {
            req.usuario = usuario;
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(tiendaRoutes);

app.use((req, res, next) => {
    next();
});

app.use(errorController.get404);

Producto.belongsTo(Usuario, { constraints: true, onDelete: 'CASCADE' });
Usuario.hasMany(Producto);
Usuario.hasOne(Carrito);
Carrito.belongsTo(Usuario);
Carrito.belongsToMany(Producto, { through: CarritoItem });
Producto.belongsToMany(Carrito, { through: CarritoItem });

Pedido.belongsTo(Usuario);
Usuario.hasMany(Pedido);
Pedido.belongsToMany(Producto, { through: PedidoItem });



sequelize
    //.sync()
    .sync({ force: true }) // Durante Desarrollo
    .then(result => {
        return Usuario.findByPk(1);
    })
    .then(usuario => {
        if (!usuario) {
            // Crear el usuario
            return Usuario.create({ nombre: 'Juan', email: 'juan@gmail.com' });
        }
        return usuario
    })
    .then(usuario => {
        return usuario.createCarrito();
    })
    .then(carrito => {
        app.listen(3000);
    })
    .catch(err => console.log(err));

