const express = require('express');
const productConroller= require("../controllers/products");
const router = express.Router();


router.get('/add-product',productConroller.getAddProduct);
router.post('/add-product',productConroller.postAddProduct);

module.exports = router;