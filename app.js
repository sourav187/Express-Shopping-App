const express = require('express');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./util/path');
const path= require('path');
const app = express();
app.use(express.static(path.join(rootDir,'public')));
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use('/', (req, res, next) => {
    //res.status(404).send('<h1>page Not Found</h1>');
    res.status(404).sendFile(path.join(rootDir,'views','404.html'));
});
app.listen(3000);