import { Component,Input} from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { CartPage } from "../../pages/cart/cart";
import { Storage } from '@ionic/storage';
import { CartProductsService } from "../../Services/cartProducts.sevice";

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  productsArrLength:number;

  @Input('myTitle') myTitle;
  text:String;
  user_email;

  constructor(public cartProductsService:CartProductsService,private storage: Storage,public http:Http ,public navCtrl: NavController) {
    storage.get('email').then((emailVal) => {
      this.user_email = emailVal;
      storage.get(emailVal).then((val)=>{
        // console.log("object from header: "+val);
        // console.log("Content Length from header "+val.length);
        // console.log("Length from header "+this.cartProductsService.cartProducts.length);
        // console.log("length "+JSON.parse(val).length);
      })
    });  
  }

  checkArrLength() {
    if(this.cartProductsService.cartProducts.length == 0 || this.cartProductsService.cartProducts == null) {
      this.productsArrLength=0;
    } else {
      this.productsArrLength = this.cartProductsService.cartProducts.length
    }
    return this.productsArrLength;
  }

  showCartPage() {
    this.navCtrl.push(CartPage);
  }

  ngAfterViewInit() {
    this.text = this.myTitle;
  }

}
