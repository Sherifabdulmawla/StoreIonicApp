import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ProductService } from '../../Services/product.service';
import { CartProductsService } from "../../Services/cartProducts.sevice";
import { Storage } from '@ionic/storage';
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  product_id:number;
  product_name:number;
  product:any=[];
  user_email;
  productObject;
  msg;

  constructor(private storage: Storage,public cartProductsService:CartProductsService,private toastCtrl: ToastController,public productService:ProductService,public navCtrl: NavController, public navParams: NavParams) {
    this.product_id=navParams.get("productId");
    this.product_name=navParams.get("productName");
    this.storage.get('email').then((val) => {
        this.user_email = val;
    });
    this.listProductData();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  presentToast(name,barcode,quantity,price,description,productQuantity) {
    if(this.user_email == null){
      let toast = this.toastCtrl.create({
        message: 'You must login',
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
      this.navCtrl.push(LoginPage);
    } else {
      if(productQuantity==0){
          let toast = this.toastCtrl.create({
            message: 'out of stock',
            duration: 3000,
            position: 'bottom'
          });
        toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        });
        toast.present();
      } else if(quantity > productQuantity) {
          let toast = this.toastCtrl.create({
            message: 'not enough quantity, only '+productQuantity+" available",
            duration: 3000,
            position: 'bottom'
          });
          toast.onDidDismiss(() => {
            console.log('Dismissoed toast');
          });
        toast.present();
      } else {
        this.productObject = {
          'name':name,
          'barcode':barcode,
          'quantity':quantity,
          'price':price,
          'description':description
        }
        this.msg=this.cartProductsService.addProductsToCart(this.productObject);
        console.log("msg is: "+this.msg);

        let toast = this.toastCtrl.create({
          message: 'Product is added to cart correctlly',
          duration: 3000,
          position: 'bottom'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
      }
    }
  }

  listProductData() {
      this.productService.getproductid(this.product_id).subscribe(data => {
        this.product = data
        console.log(`the data ${data}`);
      },
      err => console.log(`error happened getting products ${err}`)
      );
  }

}
