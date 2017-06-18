import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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
  msg;
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  constructor(private storage: Storage, private toastCtrl: ToastController, public userService: UserService, public navCtrl: NavController, public navParams: NavParams) {
    storage.get('email').then((val) => {
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

  editData(name, email, password) {
    if (name.length > 0 && email.length > 0 && password.length > 0) {
      if (this.emailPattern.test(email)) {
        this.storage.get('id').then((user_id) => {
          // set edit method from service hena ya ayaaaaa

          this.navCtrl.push(ProfilePage);
        })
      } else {
        let toast = this.toastCtrl.create({
          message: "invalid email pattern",
          duration: 3000,
          position: 'bottom'
        }); toast.present();
      }
    } else {
      let toast = this.toastCtrl.create({
        message: "please fill all data",
        duration: 3000,
        position: 'bottom'
      }); toast.present();
    }
  }

  getUserDataFromSubscribe() {
    this.storage.get('email').then((email) => {
      this.userService.getUserByEmail(email).subscribe(data => {
        this.user = data;
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

