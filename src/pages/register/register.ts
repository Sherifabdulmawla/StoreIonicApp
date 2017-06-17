import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { UserService } from "../../Services/user.service";

declare var country:any;
declare var city:any;
declare var street:any;

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user: any;
  userName: string;
  email: string;
  mobile: number;
  public static country: string;
  public static city: string;
  public static street: string;
  password: string;
  msg: string;
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  constructor(private storage: Storage, public geolocation: Geolocation, public userService: UserService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(name, email, mobile, country, city, state, password, confirmPass) {
    if (name.length > 0 && email.length > 0 && mobile.length > 0 && country.length > 0 && city.length > 0
      && state.length > 0 && password.length > 0) {
      if (this.emailPattern.test(email)) {
        if (password == confirmPass) {
          this.user = this.userService.addUser(name, email, password);
          this.getuserbyemail(email);
         // this.navCtrl.push(HomePage);
          this.storage.set('email', email);
        } else {
          this.msg = "password dosen't matches";
        }
      } else {
        this.msg = "Invalid email pattern";
      }
    } else {
      this.msg = "You must fill all fields";
    }
  }


  get_location() {
    this.geolocation.getCurrentPosition({
      // enableHighAccuracy: true,
      timeout: 300000,
      maximumAge: 0
    }).then((Position) => {
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
        console.log(address+data.results);
        RegisterPage.street = address[0];
        RegisterPage.city = address[1];
        RegisterPage.country = address[2];
        // console.log("country drom observer "+RegisterPage.country);
        // var detailedAddress = address[1] + " " + address[0];
        // alert(detailedAddress)
      }
    };
    request.send();
  };

  getCity(){
    return RegisterPage.city;
  }

  getStreet(){
    return RegisterPage.street;
  }

  getCountry(){
    return RegisterPage.country
  }

  getuserbyemail(email) {
    this.userService.getUserByEmail(email).subscribe(data => {
      console.log("data",data);
    },
      err => console.log(`error happened getting todos ${err}`)
    );
  }

}
