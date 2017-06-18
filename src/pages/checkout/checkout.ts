import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrderService } from '../../Services/order.service';
import { UserService } from "../../Services/user.service";
import { Storage } from '@ionic/storage';
import { ProfilePage } from "../profile/profile";
import { CartProductsService } from "../../Services/cartProducts.sevice";


@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  email;
  totalPrice = 0;
  orderId;
  constructor(public cartProductsService:CartProductsService,private storage:Storage,private userService:UserService,private orderservice: OrderService, public navCtrl: NavController, public navParams: NavParams) {
    storage.get('email').then((val)=>{
      this.email = val;
    })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }
  public cartproduct:any=[];
  confirm(address,mobile,date) {
    console.log("date "+JSON.stringify(date));
    this.getTotalPrice();
    this.storage.get('id').then((user_id) => {
      this.orderservice.addorder(user_id,date,this.getTotalPrice(),address,mobile).subscribe(
            data => {
               this.orderId=data;
               console.log(this.orderId);
               this.cartproduct=this.cartProductsService.listProducts();
               console.log("cart product",this.cartproduct);
             this.orderservice.addorderdetails(this.orderId,this.cartproduct);
             this.orderservice.updateProductQuantity(this.cartproduct);
             console.log("done all");
               
            },
            (err) => console.log(`errror ${err}`)
            )
      
      
    })
  }

  ListUsers() {
        return this.userService.users;
  }

  addNewField() {
    this.navCtrl.push(ProfilePage);
  }

  listMobiles() {
   return this.userService.Mobiles
  }

  getTotalPrice() {
    for(var i =0 ; i<this.cartProductsService.listProducts().length;i++) {
       this.totalPrice += (parseFloat(this.cartProductsService.listProducts()[i].quantity))*(parseFloat(this.cartProductsService.listProducts()[i].price));
    }
    return this.totalPrice;
  }


  listAddresses() {
    return this.userService.Addresses;
  }

}
