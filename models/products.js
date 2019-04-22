const products=[];

module.exports = class Products {
    constructor(t){
        this.title=t;
    }
    save(){
        products.push(this.title);
    }
    static fetchAllProducts()
    {
        return products;
    }
}