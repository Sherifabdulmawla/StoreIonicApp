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
  user;

  constructor(private storage: Storage,public userService:UserService,public navCtrl: NavController, public navParams: NavParams) {
    storage.get('email').then((val)=>{
      this.email = val;
    });
    this.getUserDataFromSubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDataPage');
  }

  ListUsers() {
        return this.userService.users;
  }

  editData(name,email,password) {
    this.storage.get('id').then((user_id) => {
      // set edit method from service hena ya ayaaaaa

      this.navCtrl.push(ProfilePage);
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

