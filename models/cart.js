const db=require('../util/database');
//add product to cart 
module.exports = class Cart {
    static addProduct(id) {
        db.execute('SELECT quantity FROM cart WHERE id=?',[id]).then(([rows]) => {
            if (rows.length){
                return db.execute('UPDATE cart SET quantity=? WHERE ?',[rows[0].quantity+1,id]);
            }else{
                 db.execute('INSERT INTO `cart`(`id`, `quantity`) VALUES (?,?)',[id,1]);
            }
        }).catch((err) => {
            console.log(err);
        });       
    }
    //delete cart logic
    static deleteProduct(id) {
        return db.execute('DELETE FROM `cart` WHERE id=?',[id]);   
    }
    static fetchCartDetails(){
       return db.execute('SELECT products.id,products.title,products.price,cart.quantity FROM products INNER JOIN cart ON cart.id=products.id');
    };
    
}