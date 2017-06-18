import { Component } from '@angular/core';
import { NavController, NavParams ,ToastController } from 'ionic-angular';
import { CheckoutPage } from "../checkout/checkout";
import { CartProductsService } from "../../Services/cartProducts.sevice";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  productsArrLength:number;

  public id:number;
  swapCartArray;

  constructor(public cartProductsService:CartProductsService,private toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams) {
    
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  checkOut(quantity) {
    for(var i = 0 ; i<this.cartProductsService.cartProducts.length;i++) {
      if(this.cartProductsService.cartProducts[i].quantity<1) {
        let toast = this.toastCtrl.create({
          message: 'quantity must by greater than 1',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      break;
    }
    // if(quantity >0){
      this.navCtrl.push(CheckoutPage);
    // } else {
    //   let toast = this.toastCtrl.create({
    //       message: 'quantity must by greater than 1',
    //       duration: 3000,
    //       position: 'bottom'
    //     });
    //     toast.present();
    // }
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
