const db=require('../util/database');

module.exports = class Products {
    constructor(id, title, imageURL, price, descraption) {
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.descraption = descraption;
        this.price = price;
    }
    save() {
        if (this.id) {
            return db.execute('UPDATE products SET id=?,title=?,price=?,description=?,imageUrl=? WHERE id=?',[this.id,this.title,this.price,this.descraption,this.imageURL,this.id])
        } else {
            return db.execute('INSERT INTO `products`(`title`, `price`, `description`, `imageUrl`) VALUES (?,?,?,?)',[this.title,this.price,this.descraption,this.imageURL]);
        }
    }
    static deleteById(id) {
        return db.execute('DELETE FROM products WHERE id=?',[id]);
    }
    static fetchAllProducts() {
       return db.execute('SELECT * FROM products');
    }
    static findbyId(id) {
        return db.execute('SELECT * FROM products WHERE id=?',[id]);
    }
}