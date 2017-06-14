import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ProductService } from '../../Services/product.service';
import { CartProductsService } from "../../Services/cartProducts.sevice";
import { ProductPage } from "../product/product";

@Component({
  selector: 'page-scan-bar-code',
  templateUrl: 'scan-bar-code.html',
})
export class ScanBarCodePage {

  options: BarcodeScannerOptions;
  result: {};
  product;
  productObject;
  msg;

  constructor(public cartProductsService:CartProductsService,private toastCtrl: ToastController,private productService:ProductService,private barCode:BarcodeScanner, public navCtrl: NavController, public navParams: NavParams) {
    this.scanBarCode();
  }

  async scanBarCode() {

    this.options = {
      prompt: 'Scan the bar code to see the result'
    }

    this.result = await this.barCode.scan(this.options);
    console.log(this.result);
  }

  cancel() {
    this.navCtrl.pop();
  }

  ListProduct() {
      return this.productService.products;
  }

  addtoCart(barcode) {
    if(this.productService.allProducts.length == 0) {
      console.log("length is 0");
    } else {
      for(var i=0 ; i<this.productService.allProducts.length;i++) {   
        if(barcode == this.productService.allProducts[i].barcode) {
            this.navCtrl.push(ProductPage,{
              "productId":this.productService.allProducts[i].idproduct,
              "productName":this.productService.allProducts[i].name
            })
        //     this.msg=this.cartProductsService.addProductsToCart(this.productService.allProducts[i]);
        //     let toast = this.toastCtrl.create({
        //       message: 'Product is added to cart correctlly',
        //       duration: 3000,
        //       position: 'bottom'
        //     });

        //     toast.onDidDismiss(() => {
        //     console.log('Dismissed toast');
        // });
        // toast.present();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanBarCodePage');
  }

}
