import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { UserService } from "../../Services/user.service";

declare var country: any;
declare var city: any;
declare var street: any;

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  userid: any;
  userName: string;
  email: string;
  mobile: number;
  public static country: string;
  public static city: string;
  public static street: string;
  password: string;
  msg: string;
  users: any = [];
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  constructor(private storage: Storage,private toastCtrl: ToastController, public geolocation: Geolocation, public userService: UserService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(name, email, mobile, country, city, street, password, confirmPass) {
    if (name.length > 0 && email.length > 0 && mobile.length > 0 && country.length > 0 && city.length > 0
      && street.length > 0 && password.length > 0) {
      if (this.emailPattern.test(email)) {
        if (password == confirmPass) {
          this.userService.addUser(name, email, password).subscribe(
            data => {
              this.userid = data;
              console.log("user id method ", this.userid);
               this.storage.set('email', email);
               this.storage.set('id',this.userid);
               this.userService.AddNewAddress(this.userid,country,city,street);
               this.userService.AddNewMobile(this.userid,mobile);
               this.navCtrl.push(HomePage);
             
            },
            (err) => console.log(`errror ${err}`)
          )



        } else {
          let toast = this.toastCtrl.create({
                message: 'Password fields are not matching',
                duration: 3000,
                position: 'bottom'
            });toast.present();
        }
      } else {
        let toast = this.toastCtrl.create({
                message: 'invalid Email Address',
                duration: 3000,
                position: 'bottom'
            });toast.present();
      }
    } else {
      let toast = this.toastCtrl.create({
                message: 'You have to fill all fields',
                duration: 3000,
                position: 'bottom'
            });toast.present();
    }
  }


  get_location() {
    this.geolocation.getCurrentPosition(
      {
      // enableHighAccuracy: true,
      timeout: 300000,
      maximumAge: 0
    }
    ).then((Position) => {
      var x = Position.coords.latitude;
      var y = Position.coords.longitude;
      this.displayLocation(x, y);
    }, (err) => alert(err.message)).catch(err => alert(err.message));
    let watcher = this.geolocation.watchPosition().subscribe((Position) => {
      watcher.unsubscribe();
    })
  }

  displayLocation(latitude, longitude) {
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
    var async = true;
    var address;

    request.open(method, url, async);
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText);
        address = data.results[0];
        address = address.formatted_address;
        address = address.split(',');
        console.log(address + data.results);
        RegisterPage.street = address[0];
        RegisterPage.city = address[1];
        RegisterPage.country = address[3];
        // console.log("country drom observer "+RegisterPage.country);
        // var detailedAddress = address[1] + " " + address[0];
        // alert(detailedAddress)
      }
    };
    request.send();
  };

  getCity() {
    return RegisterPage.city;
  }

  getStreet() {
    return RegisterPage.street;
  }

  getCountry() {
    return RegisterPage.country
  }


}