const Products = require('../models/products');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
    Products.fetchAllProducts().then(([rows, fieldData]) => {
        res.render('shop/product-list', {
            prod: rows,
            title: 'All Products',
            path: '/products',
        });
    }).catch((err) => {
        console.log(err);
    });
};
exports.getIndex = (req, res, next) => {
    Products.fetchAllProducts().then(([rows, fieldData]) => {
        res.render('shop/product-list', {
            prod: rows,
            title: 'All Products',
            path: '/',
        });
    }).catch((err) => {
        console.log(err);
    });
};
exports.postCart = async(req, res, next) => {
    const prodId = req.body.productId;
    await Cart.addProduct(prodId);
    Cart.fetchCartDetails().then(([rows]) => {
        res.render('shop/cart', {
            title: 'Your Cart',
            path: '/cart',
            cart: rows
        });
    });
};
exports.getCart = (req, res, next) => {
    Cart.fetchCartDetails().then(([rows]) => {
        res.render('shop/cart', {
            title: 'Your Cart',
            path: '/cart',
            cart: rows
        });
    }).catch((err) => {
        console.log(err);
    });

};
exports.postCartDeleteItem = (req, res, next) => {
    const productId = req.body.productId;
    Cart.deleteProduct(productId).then((result) => {
        res.redirect('/cart');
    }).catch((err) => {
        console.log(err);
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
    Products.findbyId(prodId).then(([rows]) => {
        res.render('shop/product-detail', {
            prod: rows[0],
            title: 'Product Detail',
            path: '/'
        });
    }).catch((err) => {
        console.log(err);
    });
}