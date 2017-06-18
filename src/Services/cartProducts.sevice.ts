import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import 'rxjs/add/operator/map';
@Injectable()
export class CartProductsService {

    public cartProducts = [];
    cartProductsLength;
    user_email;
    index;
    msg: string;

    constructor(public events: Events, private storage: Storage) {
        this.storage.get('email').then((val) => {
            this.user_email = val;
        });
        this.listProducts();
    }

    listProducts() {
        this.storage.get('email').then((emailVal) => {
            this.user_email = emailVal;
            this.storage.get(emailVal).then((val) => {
                if (JSON.parse(val) == null) {
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
                if (JSON.parse(val) == null) {
                    console.log("first time");
                    this.msg = "Product is added to cart correctlly";
                    this.events.publish('msg', this.msg);
                    console.log("msg from service: " + this.msg);
                    this.cartProducts.push(productObject);
                    console.log("test befor store " + this.cartProducts);
                    this.storage.set(this.user_email, JSON.stringify(this.cartProducts));
                    return;
                } else {
                    this.cartProducts = JSON.parse(val);
                    for (var i = 0; i < this.cartProducts.length; i++) {
                        if (productObject.barcode == this.cartProducts[i].barcode) {
                            this.msg = "already added";
                            this.events.publish('msg', this.msg);
                            console.log("msg from service: " + this.msg);
                            console.log("equal");
                            break;
                        } else {
                            if (i == this.cartProducts.length - 1) {
                                this.msg = "Product is added to cart correctlly";
                                this.events.publish('msg', this.msg);
                                this.cartProducts.push(productObject)
                                this.storage.set(this.user_email, JSON.stringify(this.cartProducts));
                                this.cartProductsLength = this.cartProducts.length;
                                console.log("msg from service: " + this.msg);
                                console.log("not equal");
                                break;
                            }
                        }
                    }

                }
            });
        });
    }

    deleteProduct(id) {
        console.log("sss "+this.cartProducts);
        this.storage.remove(this.user_email);
        let swapArr;
        swapArr = this.cartProducts.filter((product) => product.idproduct != id);
        this.cartProducts = [];
        console.log("swap array length "+swapArr.length+" this "+this.cartProducts);
        for (var i = 0; i < swapArr.length; i++) {
            console.log("price"+swapArr[i].price);
            this.addProductsToCart(swapArr[i]);
            // swapArr.length -=1;
        }
        // console.log("test befor store "+this.cartProducts);
        // this.storage.set(this.user_email,JSON.stringify(this.cartProducts));
    }

    deleteAllProducts() {
        this.storage.get(this.user_email).then((val) => {
            console.log("before " + val);
        });
        this.storage.remove(this.user_email);
        this.cartProducts = [];
        this.storage.get(this.user_email).then((val) => {
            console.log("after " + val);
        });
    }

}