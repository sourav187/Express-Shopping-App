const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        title: 'Add Product',
        path: '/add-product',
    });
};

exports.postAddProduct = (req, res, next) => {
    products.push(req.body.title);
    console.log(req.body);
    res.redirect(302, '/');
};

exports.getProducts = (req, res, next) => {
    console.log(products);
    //res.send('<h1>Welcome to the shop</h1>');
    res.render('shop', {
        prod: products,
        title: 'My Shop',
        path: '/',
    });
};