const path = require('path');
const fs = require('fs');
const rootDir = require('../util/path');
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
    constructor(title, imageURL, price, descraption) {
        this.id = crypto.randomBytes(16).toString('hex');
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
            getProductFromFile((productsArray) => {
                productsArray.push(this);
                fs.writeFile(filePath, JSON.stringify(productsArray), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    static fetchAllProducts(cb) {
        getProductFromFile(cb);
    }
    static findbyId(URLId,cb) {
        getProductFromFile((productsArray)=>{
            let Product=productsArray.find(prodtctObject => prodtctObject.id=URLId);
            cb(Product);
        });
    }
}