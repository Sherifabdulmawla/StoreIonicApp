import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../Services/user.service";
import { EditDataPage } from '../edit-data/edit-data';
import { Storage } from '@ionic/storage';
import { AddAddressPage } from "../add-address/add-address";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  mobiles = [];
  addresses = [];
  user;
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
    this.getUserDataFromSubscribe();
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

  addNewAddress() {
    this.navCtrl.push(AddAddressPage);
  }

  addNewMobile(mobile) {
      this.storage.get('id').then((user_id) => {
        this.user_id = user_id;
        this.userService.AddNewMobile(this.user_id,mobile);
      })
  }

  getUserDataFromSubscribe() {
    this.storage.get('email').then((email)=> {
        this.userService.getUserByEmail(email).subscribe(data => {
                 this.user=data;
                //  return this.user;
                //  console.log("user from profile "+this.user);
        },
        (err) => console.log(`errror ${err}`))
    })
  }

  getUserData() {
    return this.user;
  }

}
