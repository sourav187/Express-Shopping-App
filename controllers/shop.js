const Products = require('../models/products');
exports.getProducts = (req, res, next) => {
    //res.send('<h1>Welcome to the shop</h1>');
    Products.fetchAllProducts((products) => {
        res.render('shop/product-list', {
            prod: products,
            title: 'All Products',
            path: '/products',
        });
    })
};
exports.getIndex = (req, res, next) => {
    //res.send('<h1>Welcome to the shop</h1>');
    Products.fetchAllProducts((productsArray) => {
        res.render('shop/index', {
            prod: productsArray,
            title: 'My Shop',
            path: '/',
        });
    })
};
exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        title: 'Your Cart',
        path: '/cart',
    });

};
exports.getCheckout = (req, res, next) => {
    res.render('shop/cart', {
        title: 'Checkout',
        path: '/checkout',
    });

};
exports.getProductDetail = (req, res, next) => {
    const prodId = req.params.productId
    Products.findbyId(prodId, (product)=>{
        res.render('shop/product-detail',{
            prod: product,
            title: 'Product Detail',
            path: '/'
        });
    });
}