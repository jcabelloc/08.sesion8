const Producto = require('../models/producto');

exports.getCrearProducto = (req, res) => {
    res.render('admin/editar-producto', {
        titulo: 'Crear Producto',
        path: '/admin/crear-producto',
        modoEdicion: false
    })
};

exports.postCrearProducto = (req, res) => {

    const nombre = req.body.nombre;
    const urlImagen = req.body.urlImagen;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;
    req.usuario
        .createProducto({
            nombre: nombre,
            precio: precio,
            urlImagen: urlImagen,
            descripcion: descripcion
        })
        .then(
            result => {
                console.log(result);
                res.redirect('/');
            })
        .catch(err => console.log(err));
};

exports.getEditarProducto = (req, res) => {

    const modoEdicion = req.query.editar;
    const idProducto = req.params.idProducto;
    Producto.findByPk(idProducto)
        .then(producto => {
            if (!producto) {
                return res.redirect('/');
            }
            res.render('admin/editar-producto', {
                titulo: 'Editar Producto',
                path: '/admin/editar-producto',
                producto: producto,
                modoEdicion: true,
            })
        })
        .catch(err => console.log(err));
}


exports.postEditarProducto = (req, res, next) => {
    const idProducto = req.body.idProducto;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const urlImagen = req.body.urlImagen;
    const descripcion = req.body.descripcion;
    Producto.findByPk(idProducto)
        .then(producto => {
            producto.nombre = nombre;
            producto.precio = precio;
            producto.urlImagen = urlImagen;
            producto.descripcion = descripcion;
            return producto.save();
        })
        .then(result => {
            console.log('Producto actualizado satisfactoriamente');
            res.redirect('/admin/productos');
        })
        .catch(err => console.log(err));

};



exports.getProductos = (req, res) => {
    req.usuario.getProductos()
        .then(productos => {
            res.render('admin/productos', {
                prods: productos,
                titulo: "Administracion de Productos",
                path: "/admin/productos"
            });

        })
        .catch(err => console.log(err));
};

exports.postEliminarProducto = (req, res, next) => {
    const idProducto = req.body.idProducto;
    Producto.findByPk(idProducto)
        .then(producto => {
            return producto.destroy();
        })
        .then(result => {
            console.log('Producto eliminado satisfactoriamente');
            res.redirect('/admin/productos');
        })
        .catch(err => console.log(err));
};