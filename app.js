const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const database = require('./utils/database');
const mongoConnect = database.mongoConnect;

const adminRoutes = require('./routes/admin')
const tiendaRoutes = require('./routes/tienda')
const errorController = require('./controllers/error');

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    next();
})

app.use('/admin', adminRoutes);
app.use(tiendaRoutes);


app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
})


