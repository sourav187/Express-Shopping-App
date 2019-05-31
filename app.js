const express = require('express');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./util/path');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const errorController=require('./controllers/error')

//create express app
const app = express();

//Template Engine 
app.set('view engine', 'ejs');
app.set('views', 'views');

//Body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Route declaration
app.use(express.static(path.join(rootDir, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//Page note found rout
app.use('/', errorController.pageNotFound);
app.listen(3000,);