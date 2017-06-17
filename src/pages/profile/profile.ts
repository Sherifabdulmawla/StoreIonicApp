import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../Services/user.service";
import { EditDataPage } from '../edit-data/edit-data';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  mobiles = [];
  addresses = [];
  user = {};
  email;
  user_id;

  constructor(private storage: Storage, public userService: UserService, public navCtrl: NavController, public navParams: NavParams) {
    storage.get('email').then((val) => {
      this.email = val;
    });
    storage.get('id').then((val) => {
      this.user_id = val;
      console.log("id " + this.user_id);
    })
    // console.log(this.listMobiles());
    // console.log("mobiles ", this.Mobiles);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  editData() {
    this.navCtrl.push(EditDataPage);
  }

  ListUsers() {
    return this.userService.users;
  }

  listMobiles() {
   return this.userService.Mobiles
  }


  listAddresses() {
    return this.userService.Addresses;
  }

}
