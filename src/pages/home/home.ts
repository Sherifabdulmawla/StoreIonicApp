import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { CategoriesPage } from '../categories/categories';
import { CartPage } from "../cart/cart";
import { OrderHistoryPage } from "../order-history/order-history";
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ProductService } from "../../Services/product.service";
import { CartProductsService } from "../../Services/cartProducts.sevice";
import { ProductPage } from "../product/product";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: BarcodeScannerOptions;
  result;
  barcode;

  constructor(private toastCtrl: ToastController,private productService:ProductService,public cartProductsService:CartProductsService,private barCode:BarcodeScanner,public navCtrl: NavController,public navParams:NavParams) {
    this.result={"text":"","format":"","cancelled":false};
  }

  async scanBarCode() {

    this.options = {
      prompt: 'Scan the bar code to see the result'
    }

    this.result = await this.barCode.scan(this.options);
    
    if(this.productService.allProducts.length == 0) {
      console.log("length is 0");
    } else {
      for(var i=0 ; i<this.productService.allProducts.length;i++) {  
        console.log("text "+this.result.text);
        console.log("db "+this.productService.allProducts[i].barcode)
        if(this.result.text == this.productService.allProducts[i].barcode) {
            this.navCtrl.push(ProductPage,{
              "productId":this.productService.allProducts[i].idproduct,
              "productName":this.productService.allProducts[i].name
            })
        break;
      } else {
        if(i==this.productService.allProducts.length-1){
              let toast = this.toastCtrl.create({
            message: 'Product is not exist',
            duration: 3000,
            position: 'bottom'
          });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
        } else {
        continue;
        }
      
    }
  }
  }

  }

  showCategories() {
    this.navCtrl.push(CategoriesPage);
  }

  showProfile() {
    this.navCtrl.push(ProfilePage);
  }

  showHistory() {
    this.navCtrl.push(OrderHistoryPage);
  }

  showCart() {
    this.navCtrl.push(CartPage);
  }

}
