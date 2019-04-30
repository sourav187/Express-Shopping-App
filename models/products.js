const path = require('path');
const fs = require('fs');
const rootDir = require('../util/path');


module.exports = class Products {
    constructor(t) {
        this.title = t;
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
            const filePath = path.join(rootDir, 'data', 'products.json');
            fs.readFile(filePath, (err, fileContent) => {
                let products = [];
                if (!err && fileContent.length > 0) {
                    products = JSON.parse(fileContent);
                }
                products.push(this);
                fs.writeFile(filePath, JSON.stringify(products), (err) => {
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
        const filePath = path.join(rootDir, 'data', 'products.json');
        fs.readFile(filePath, (err, fileContent) => {
            if (!err && fileContent.length > 0) {
                cb(JSON.parse(fileContent));
            } else {
                cb([]);
            }
        });
    }
}