import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { UserService } from "../../Services/user.service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {
  email;

  constructor(private storage: Storage,public userService:UserService,public navCtrl: NavController, public navParams: NavParams) {
    storage.get('email').then((val)=>{
      this.email = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDataPage');
  }

  ListUsers() {
        return this.userService.users;
  }

  EditData() {
    this.navCtrl.push(ProfilePage);
  }

}

