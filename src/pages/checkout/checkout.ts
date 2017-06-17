import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrderService } from '../../Services/order.service';
import { UserService } from "../../Services/user.service";
import { Storage } from '@ionic/storage';
import { ProfilePage } from "../profile/profile";


@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  email;

  constructor(private storage:Storage,private userService:UserService,private orderservice: OrderService, public navCtrl: NavController, public navParams: NavParams) {
    storage.get('email').then((val)=>{
      this.email = val;
    })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  confirm(date) {
    console.log(date);
     this.orderservice.addorder();
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


  listAddresses() {
    return this.userService.Addresses;
  }

}
