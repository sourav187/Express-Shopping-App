const express = require('express');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./util/path');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

//create express app
const app = express();

//Template Engine 
app.engine('hbs', handlebars({
    layoutsDir: 'views/layout',
    defaultLayout: 'nav-layout.hbs',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
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
        //layout:false // Disable default layout
        // layout:'nav-layout.hbs' //multiple layout call
    });
});
app.listen(3000);