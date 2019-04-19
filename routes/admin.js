const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const rootDir = require('../util/path');
const router = express.Router();

router.use(bodyparser.urlencoded({
    extended: false
}));
router.get('/add-product', (req, res, next) => {
    // res.send(`<Form method="POST" action="/admin/product">
    // <input type="text" name="user">
    // <button>Submit</button>
    // </Form>`);
    res.sendFile(path.join(rootDir,'views','add-product.html'));
});
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect(302,'/');
});

module.exports = router;