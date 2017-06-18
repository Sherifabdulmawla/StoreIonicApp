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
  totalPrice=0;

  constructor(public cartProductsService:CartProductsService,private toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams) {
    this.calcTotalPrice();
    this.getTotalPrice();
    this.getTotalPrice();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  checkOut(quantity) {
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

  calcTotalPrice() {
    for (var i = 0; i < this.cartProductsService.listProducts().length; i++) {
      this.totalPrice += (parseFloat(this.cartProductsService.listProducts()[i].quantity)) * (parseFloat(this.cartProductsService.listProducts()[i].price));
    }
    return this.totalPrice;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  testTotalPrice() {
    var inputNum = (<HTMLInputElement>document.getElementById("inputNum")).value;
    console.log(inputNum);
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
