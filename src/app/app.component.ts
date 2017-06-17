import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { CategoriesPage } from '../pages/categories/categories';
import { CartPage } from '../pages/cart/cart';
import { OrderHistoryPage } from "../pages/order-history/order-history";
import { CartProductsService } from "../Services/cartProducts.sevice";
import { UserService } from "../Services/user.service";
import { Network } from '@ionic-native/network';

declare var isLogged:any;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  user_email;
  public static isLogged: string;
  pages: Array<{title: string, component: any}>;

  constructor(public events: Events,private network: Network, public userService:UserService,public cartProductsService:CartProductsService,private storage: Storage,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen)
  {
    this.initializeApp();
    this.setSideMenue();
     platform.ready().then(() => {
      // if no internet, notice is a string
      if (this.network.type == 'none' ) { 
        // stuff if disconnected
       alert("disconnected");
      } 
    })
  }

  setSideMenue() {
    this.storage.get('email').then((val) => {
      this.user_email = val;
      if(val != null){
        this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'profile',component:ProfilePage},
          { title: 'Cart' , component:CartPage},
          { title: 'Categories' , component:CategoriesPage},
          { title: 'History' , component:OrderHistoryPage}
        ];
      } else if(val == null) {
        this.pages = [
          { title: 'Home', component: HomePage },
        ];
      } else if(this.isLoggedUser() == this.user_email) {
        this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'profile',component:ProfilePage},
          { title: 'Cart' , component:CartPage},
          { title: 'Categories' , component:CategoriesPage},
          { title: 'History' , component:OrderHistoryPage},
          { title : 'aaa',component:this.logOut()}
        ];
      }
    });
  }

  logOut() {
    this.storage.remove('email');
    this.nav.setRoot(LoginPage);
    this.setSideMenue();
  }

  logIn() {
    this.nav.setRoot(LoginPage);
    this.setSideMenue();
  }

  checkLoggin() {
    this.events.subscribe('user:created', (email) => {
      MyApp.isLogged = email;
    });
  }

  isLoggedUser(){
    return MyApp.isLogged;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
