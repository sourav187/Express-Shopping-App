const Products = require('../models/products');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        title: 'Add Product',
        path: '/add-product',
    });
};
exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const productPrice = req.body.productPrice;
    const descraption = req.body.descraption;
    const product = new Products(null, title, imageUrl, productPrice, descraption);
    product.save();
    res.redirect(302, '/');
};
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    console.log(editMode);
    if (editMode) {
        const productId = req.params.productId
        Products.findbyId(productId, (product) => {
            if (product) {
                res.render('admin/edit-product', {
                    title: 'Edit Product',
                    path: '/edit-product',
                    editMode: editMode,
                    product: product
                });
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.redirect('/');
    }
};
exports.postEditProduct = (req, res, next) => {
    console.log(req.body.title);
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const productPrice = req.body.productPrice;
    const descraption = req.body.descraption;
    const product = new Products(id, title, imageUrl, productPrice, descraption);
    product.save();
    res.redirect('/products');
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

exports.getDeleteProduct = (req, res, next) => {
    const ProductId = req.params.productId;
    Products.deleteById(ProductId);
    res.redirect('/admin/products');
};