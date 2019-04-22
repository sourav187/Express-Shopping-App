const express = require('express');
const router = express.Router();
const productConroller= require("../controllers/products");

router.get('/', productConroller.getProducts);
module.exports = router;