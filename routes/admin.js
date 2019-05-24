const express = require('express');
const adminConroller = require("../controllers/admin");
const router = express.Router();


router.get('/add-product', adminConroller.getAddProduct);
router.post('/add-product', adminConroller.postAddProduct);
router.get('/products', adminConroller.getProducts)
module.exports = router;