import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CheckoutPage } from "../checkout/checkout";
import { CartProductsService } from "../../Services/cartProducts.sevice";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  productsArrLength:number;

  public id:number;

  constructor(public cartProductsService:CartProductsService,public navCtrl: NavController, public navParams: NavParams) {
    
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  checkOut() {
    this.navCtrl.push(CheckoutPage);
  }

  Listproducts() {
      return this.cartProductsService.cartProducts;
  }

  checkArrLength() {
    if(this.cartProductsService.cartProducts.length == 0 || this.cartProductsService.cartProducts == null) {
      this.productsArrLength=0;
    } else {
      this.productsArrLength = this.cartProductsService.cartProducts.length
    }
    return this.productsArrLength;
  }

  continueShopping() {
    this.navCtrl.pop();
  }

  deleteProduct(id:number) {
    this.cartProductsService.deleteProduct(id);
  }

  deleteAll() {
    this.cartProductsService.deleteAllProducts();
  }


}
