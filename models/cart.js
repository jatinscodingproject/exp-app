const fs = require('fs')
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart{
    static addProduct(id,productPrice){
        fs.readFile(p,(err,fileContent) => {
            let cart = { products:[] , totalPrice:0 }
            if (err){
                console.log(err)
            }
            // Analyze the cart and find exixting product
            const existingProductIndex = cart.products.findIndex(prod => prod.Id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;
            // Add new Product and increase quantity
            if(existingProduct){
                updatedProduct = {...existingProduct}
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            }else{
                updatedProduct = {id:id,qty:1}
                cart.products = [...cart.products,updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice
            fs.writeFile(p,JSON.stringify(cart),err => {
                console.log(err);
            })
        });

    }
    static deleteProduct(id,price){
        fs.readFile(p,(err,fileContent) => {
            if (err){
                return;
            }
            const updatedCart = {...fileContent};
            const product = updatedCart.products.findIndex(prod => prod.id === id);
            if(!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            updatedCart.totalPrice = cart.totalPrice - productPrice + productQty;
            fs.writeFile(p,JSON.stringify(updatedCart), err => {
                console.log(err)
            })
        })
    }
    static getCart(cb){
        fs.readFile(p, (err,fileContent) => {
            if(err){
                cb(null)
            }else{
                cb(Cart)
            }
        })
    }
}