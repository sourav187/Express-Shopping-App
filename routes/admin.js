const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const router = express.Router();
const products = [];

router.get('/add-product', (req, res, next) => {
    // res.send(`<Form method="POST" action="/admin/product">
    // <input type="text" name="user">
    // <button>Submit</button>
    // </Form>`);
    res.render('add-product', {
        title: 'Add Product',
        path: '/add-product',
        activeAddproduct: true
    });
});
router.post('/add-product', (req, res, next) => {
    products.push(req.body.title);
    console.log(req.body);
    res.redirect(302, '/');
});

module.exports = {
    routes: router,
    products
};