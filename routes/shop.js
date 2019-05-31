const express = require('express');
const router = express.Router();
const shopConroller= require("../controllers/shop");

router.get('/', shopConroller.getIndex);
router.get('/products',shopConroller.getProducts);
router.get('/products/:productId',shopConroller.getProductDetail);
router.post('/delete-cart-item',shopConroller.postCartDeleteItem);
router.get('/cart',shopConroller.getCart)
router.post('/cart',shopConroller.postCart);
router.get('/checkout',shopConroller.getCheckout);
module.exports = router;