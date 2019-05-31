const path = require('path');
const fs = require('fs');
const rootDir = require('../util/path');
const Cart = require('../models/cart');
const crypto = require('crypto');

const getProductFromFile = cb => {
    const filePath = path.join(rootDir, 'data', 'products.json');
    fs.readFile(filePath, (err, fileContent) => {
        if (!err && fileContent.length > 0) {
            cb(JSON.parse(fileContent));
        } else {
            cb([]);
        }
    });
}

module.exports = class Products {
    constructor(id, title, imageURL, price, descraption) {
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.descraption = descraption;
        this.price = price;
    }
    save() {
        let fileCreated = new Promise((resolve, reject) => {
            if (!fs.existsSync(path.join(rootDir, 'data'))) {
                fs.mkdir(path.join(rootDir, 'data'), (err) => {
                    console.log(err);
                    reject('Unable to create Dir');
                });
                fs.closeSync(fs.openSync(path.join(rootDir, 'data', 'products.json'), 'w'));
                resolve();
            } else {
                resolve();
            }
        });
        fileCreated.then((result) => {
            if (this.id) {
                const exestingProductArray = getProductFromFile((productsArray) => {
                    const updatedProductIndex = productsArray.findIndex(prod => prod.id = this.id);
                    productsArray[updatedProductIndex] = this;
                    const filePath = path.join(rootDir, 'data', 'products.json');
                    fs.writeFile(filePath, JSON.stringify(productsArray), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            } else {
                this.id = crypto.randomBytes(16).toString('hex');
                getProductFromFile((productsArray) => {
                    productsArray.push(this);
                    const filePath = path.join(rootDir, 'data', 'products.json');
                    fs.writeFile(filePath, JSON.stringify(productsArray), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    static deleteById(id) {
        getProductFromFile((productsArray) => {
            const product = productsArray.find(prodtctObject => prodtctObject.id === id);
            let UpdatedProductArray = productsArray.filter(prodtctObject => prodtctObject.id !== id);
            const filePath = path.join(rootDir, 'data', 'products.json');
            fs.writeFile(filePath, JSON.stringify(UpdatedProductArray), (err) => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }

    static fetchAllProducts(cb) {
        getProductFromFile(cb);
    }

    static findbyId(id, cb) {
        getProductFromFile((productsArray) => {
            let Product = productsArray.find(prodtctObject => prodtctObject.id === id);
            cb(Product);
        });
    }
}