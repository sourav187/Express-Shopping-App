const Products = require('../models/products');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        title: 'Add Product',
        path: '/add-product',
    });
};
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const productPrice = req.body.productPrice;
    const descraption = req.body.descraption;
    const product = new Products(null, title, imageUrl, productPrice, descraption);
    product.save().then((result) => {
        console.log(result[0].affectedRows);
        res.redirect(302, '/products');
    }).catch((err) => {
        console.log(err);
    });
};
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (editMode) {
        const productId = req.params.productId
        Products.findbyId(productId).then(([rows]) => {
            console.log(rows)
            if (rows) {
                res.render('admin/edit-product', {
                    title: 'Edit Product',
                    path: '/edit-product',
                    editMode: editMode,
                    product: rows[0]
                });
            } else {
                res.redirect('/');
            }
        }).catch((err) => {
            console.log(`Edit product not possible ${err}`);
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
    product.save().then((result) => {
        console.log(result[0].affectedRows);
        res.redirect(302, '/admin/products');
    }).catch((err) => {
        console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
    //res.send('<h1>Welcome to the shop</h1>');
    Products.fetchAllProducts().then(([rows]) => {
        res.render('admin/product-list', {
            prod: rows,
            title: 'Admin Products',
            path: '/admin/products',
        });
    }).catch((err) => {
        console.log(err);
    });
};

exports.getDeleteProduct = (req, res, next) => {
    const ProductId = req.params.productId;
    Products.deleteById(ProductId).then((result) => {
        res.redirect('/admin/products');
    }).catch((err) => {
        console.log(err);
    });
};