const Products = require('../models/products');
const Cart = require('../models/cart');
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
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Products.findbyId(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
        Cart.fetchCartDetails((cart) => {
            const cartProducts = [];
            Products.fetchAllProducts(products => {
                for (product of products) {
                    cartProductData = cart.products.find(prod => prod.id === product.id);
                    if (cartProductData) {
                        cartProducts.push({
                            productData: product,
                            qty: cartProductData.qty
                        });
                    }
                }
                res.render('shop/cart', {
                    title: 'Your Cart',
                    path: '/cart',
                    cart: cartProducts,
                    totalCartValue: cart.totalPrice
                });
            });
        });
    })

};
exports.getCart = (req, res, next) => {
    Cart.fetchCartDetails((cart) => {
        const cartProducts = [];
        Products.fetchAllProducts(products => {
            for (product of products) {
                cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty
                    });
                }
            }
            res.render('shop/cart', {
                title: 'Your Cart',
                path: '/cart',
                cart: cartProducts,
                totalCartValue: cart.totalPrice
            });
        });
    });
};
exports.postCartDeleteItem = (req, res, next) => {
    const productId = req.body.productId;
    const productPrice = req.body.productPrice;
    Cart.deleteProduct(productId, productPrice);
    res.redirect('/cart');
};
exports.getCheckout = (req, res, next) => {
    res.render('shop/cart', {
        title: 'Checkout',
        path: '/checkout',
    });

};
exports.getProductDetail = (req, res, next) => {
    const prodId = req.params.productId
    Products.findbyId(prodId, (product) => {
        res.render('shop/product-detail', {
            prod: product,
            title: 'Product Detail',
            path: '/'
        });
    });
}