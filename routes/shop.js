const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const path = require('path');
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    const products = adminData.products;
    console.log(products);
    //res.send('<h1>Welcome to the shop</h1>');
    res.render('shop', {
        prod: products,
        title: 'My Shop',
        path: '/',
    });
});
module.exports = router;