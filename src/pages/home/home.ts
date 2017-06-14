import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { CategoriesPage } from '../categories/categories';
import { CartPage } from "../cart/cart";
import { OrderHistoryPage } from "../order-history/order-history";
import { ScanBarCodePage } from "../scan-bar-code/scan-bar-code";
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
  result: {};
  barcode=11111;

  constructor(private toastCtrl: ToastController,private productService:ProductService,public cartProductsService:CartProductsService,private barCode:BarcodeScanner,public navCtrl: NavController,public navParams:NavParams) {
    
  }

  // async scanBarCode() {

  //   this.options = {
  //     prompt: 'Scan the bar code to see the result'
  //   }

  //   this.result = await this.barCode.scan(this.options);
  //   console.log(this.result);
  //   if(this.productService.allProducts.length == 0) {
  //     console.log("length is 0");
  //   } else {
  //     for(var i=0 ; i<this.productService.allProducts.length;i++) {  
        
  //       if(this.barcode == this.productService.allProducts[i].barcode) {
  //           this.navCtrl.push(ProductPage,{
  //             "productId":this.productService.allProducts[i].idproduct,
  //             "productName":this.productService.allProducts[i].name
  //           })
  //       break;
  //     } else {
  //       if(i==this.productService.allProducts.length-1){
  //             let toast = this.toastCtrl.create({
  //           message: 'Product is not exist',
  //           duration: 3000,
  //           position: 'bottom'
  //         });

  //     toast.onDidDismiss(() => {
  //       console.log('Dismissed toast');
  //     });
  //     toast.present();
  //       } else {
  //       continue;
  //       }
      
  //   }
  // }
  // }

  // }

  scanBarCode() {
    this.navCtrl.push(ScanBarCodePage);
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
