const express = require('express');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./util/path');
const path= require('path');
const app = express();
app.set('view engine','pug');
app.set('views','views');
app.use(express.static(path.join(rootDir,'public')));
app.use('/admin',adminData.routes);
app.use(shopRoutes);

app.use('/', (req, res, next) => {
    //res.status(404).send('<h1>page Not Found</h1>');
    res.status(404).render('404',{title:'Page Not Found',path:'/'})
});
app.listen(3000);