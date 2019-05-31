const express = require('express');
const adminConroller = require("../controllers/admin");
const router = express.Router();


router.get('/add-product', adminConroller.getAddProduct);
router.post('/add-product', adminConroller.postAddProduct);
router.get('/products', adminConroller.getProducts);
router.get('/edit-product/:productId',adminConroller.getEditProduct);
router.post('/edit-product',adminConroller.postEditProduct);
router.get('/delete-product/:productId',adminConroller.getDeleteProduct);
module.exports = router;