const express= require('express');
const router=express.Router();
const rootDir = require('../util/path');
const path=require('path');
router.get('/',(req,res,next)=>{
    console.log('hi');
    //res.send('<h1>Welcome to the shop</h1>');
    res.sendFile(path.join(rootDir,'views','shop.html'));
});
module.exports=router;