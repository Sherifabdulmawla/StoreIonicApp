import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { UserService } from "../../Services/user.service";
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public static isLogged: string;
  msg: string = "";
  user_id;

  constructor(public events: Events, private storage: Storage, public userService: UserService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginToHome(email, password) {
    this.userService.login(email, password).subscribe(data => {
      if (data) {
        console.log(data);
        this.navCtrl.push(HomePage, {
          "user_email": email
        })
        this.storage.set('email', email);
        this.events.publish('user:created', email);
        this.userService.getUserByEmail(email).subscribe(data => {
                 this.user_id=JSON.stringify(data[0].iduser);
                 this.storage.set('id',this.user_id);
                 console.log("user id from login "+this.user_id);
        },

          (err) => console.log(`errror ${err}`))
      } else {
        this.msg = "Incorrect data";
      }
    },
      err => console.log(`error happened getting user ${err}`)

    )
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  getUser() {
    return this.userService.users;
  }

}
