import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import { UserService } from "../../Services/user.service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {

  constructor(private storage: Storage,public userService: UserService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAddressPage');
  }

  addAddress(country,city,state) {
    this.navCtrl.push(ProfilePage);
  }

}
