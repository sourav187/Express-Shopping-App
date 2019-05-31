const path = require('path');
const fs = require('fs');
const rootDir = require('../util/path');
const filePath = path.join(rootDir, 'data', 'cart.json');
//fetch previous cart detail from Json
const getProductFromCartFile = cb => {
    fs.readFile(filePath, (err, fileContent) => {
        if (!err && fileContent.length > 0) {
            cb(JSON.parse(fileContent));
        } else {
            cb({
                products: [],
                totalPrice: 0.0
            });
        }
    });
}
//add product to cart 
module.exports = class Cart {
    static addProduct(id, productPrice) {
        let fileCreated = new Promise((resolve, reject) => {
            if (!fs.existsSync(path.join(rootDir, 'data'))) {
                fs.mkdir(path.join(rootDir, 'data'), (err) => {
                    console.log(err);
                    reject('Unable to create Dir');
                });
                fs.closeSync(fs.openSync(path.join(rootDir, 'data', 'cart.json'), 'w'));
                resolve();
            } else {
                resolve();
            }
        });
        fileCreated.then((result) => {
                getProductFromCartFile((cart) => {
                    const exestingProductIndex = cart.products.findIndex(product => product.id === id);
                    let existingProduct = cart.products[exestingProductIndex];
                    let updatedProduct;
                    if (existingProduct) {
                        updatedProduct = {
                            ...existingProduct
                        };
                        updatedProduct.qty = updatedProduct.qty + 1;
                        cart.products = [...cart.products];
                        cart.products[exestingProductIndex] = updatedProduct;
                    } else {
                        updatedProduct = {
                            id: id,
                            qty: 1
                        };
                        cart.products = [...cart.products, updatedProduct];
                    }
                    cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(productPrice);
                    fs.writeFile(filePath, JSON.stringify(cart), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //delete cart logic
    static deleteProduct(id, productPrice) {
        getProductFromCartFile((cart) => {
            if (cart.products.length<=0) {
                return;
                console.log('No product found in the cart');
            } else {
                let updatedCart = {
                    ...cart
                };
                const product = updatedCart.products.find(product => product.id === id);
                console.log(product)
                const productQty = product.qty;
                updatedCart.products = updatedCart.products.filter(product => product.id !== id);
                updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
                fs.writeFile(filePath, JSON.stringify(updatedCart), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    }
    static fetchCartDetails(cb){
        getProductFromCartFile(cb);
    };
    
}