import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
@Injectable()
export class CartProductsService {

    public cartProducts = [];
    cartProductsLength;
    user_email;
    index;
    msg;
   
    constructor(private storage: Storage) {
        this.storage.get('email').then((val) => {
            this.user_email = val;
        });
        this.listProducts();
    }

    listProducts() {
        this.storage.get('email').then((emailVal) => {
            this.user_email = emailVal;
            this.storage.get(emailVal).then((val) => {
                if(JSON.parse(val) == null){
                    this.cartProducts = [];
                } else {
                    this.cartProducts = JSON.parse(val);
                    this.cartProductsLength = this.cartProducts.length;
                }
            });
        });
        return this.cartProducts;
    }

    addProductsToCart(productObject) {
        this.storage.get('email').then((emailVal) => {
            this.user_email = emailVal;
            this.storage.get(emailVal).then((val) => {
                if(JSON.parse(val) == null){
                    this.cartProducts.push(productObject);
                    this.storage.set(this.user_email,JSON.stringify(this.cartProducts));
                } else {
                    this.cartProducts = JSON.parse(val);
                    for(var i=0;i<this.cartProducts.length;i++) {
                        if(productObject.barCode == this.cartProducts[i].barCode) {
                            this.msg = "already added";
                            console.log("equal");
                            break;
                            // this.cartProducts[i].quantity = parseInt(this.cartProducts[i].quantity)+1;
                        } else {
                            this.cartProducts.push(productObject);
                            this.msg = "Product is added to cart correctlly";
                            console.log("not equal");
                            break;
                        }
                    }
                    // this.cartProducts.push(productObject);
                    this.storage.set(this.user_email,JSON.stringify(this.cartProducts));
                    this.cartProductsLength = this.cartProducts.length;
                }
            }); 
        });
    }

    deleteProduct(id) {
        this.storage.get(this.user_email).then((val)=>{
            this.cartProducts = JSON.parse(val);
            this.cartProducts=this.cartProducts.filter((product)=> product.id !=id);
            this.storage.set(this.user_email,JSON.stringify(this.cartProducts));
        }); 
    }

    deleteAllProducts() {
        this.storage.get(this.user_email).then((val)=>{
            console.log("before "+val);
        });
        this.storage.remove(this.user_email);
        this.cartProducts=[];
        this.storage.get(this.user_email).then((val)=>{
            console.log("after "+val);
        });   
    }

}