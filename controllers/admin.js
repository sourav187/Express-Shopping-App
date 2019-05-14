const Products = require('../models/products');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        title: 'Add Product',
        path: '/add-product',
    });
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const productPrice=req.body.productPrice;
    const descraption=req.body.descraption;
    const product = new Products(title,imageUrl,productPrice,descraption);
    product.save();
    console.log(product.title);
    console.log(req.body);
    res.redirect(302, '/');
};
exports.getProducts = (req, res, next) => {
    //res.send('<h1>Welcome to the shop</h1>');
    Products.fetchAllProducts((products) => {
        res.render('admin/product-list', {
            prod: products,
            title: 'Admin Products',
            path: '/admin/products',
        });
    })
};