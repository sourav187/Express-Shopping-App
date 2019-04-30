const Products = require('../models/products');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        title: 'Add Product',
        path: '/add-product',
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Products(req.body.title);
    product.save();
    console.log(product.title)
    console.log(req.body);
    res.redirect(302, '/');
};

exports.getProducts = (req, res, next) => {
    //res.send('<h1>Welcome to the shop</h1>');
    Products.fetchAllProducts((products) => {
        res.render('shop', {
            prod: products,
            title: 'My Shop',
            path: '/',
        });
    })

};