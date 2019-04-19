const express = require('express');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./util/path');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');

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
app.use('/admin', adminData.routes);
app.use(shopRoutes);

//Page note found rout
app.use('/', (req, res, next) => {
    //res.status(404).send('<h1>page Not Found</h1>');
    res.status(404).render('404', {
        title: 'Page Not Found',
        path: '/',
    });
});
app.listen(3000);