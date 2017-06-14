import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { ScanBarCodePage } from '../pages/scan-bar-code/scan-bar-code';
import { CategoriesPage } from '../pages/categories/categories';
import { CartPage } from '../pages/cart/cart';
import { OrderHistoryPage } from "../pages/order-history/order-history";
import { CartProductsService } from "../Services/cartProducts.sevice";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  user_email;

  pages: Array<{title: string, component: any}>;

  constructor(public cartProductsService:CartProductsService,private storage: Storage,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.setSideMenue();
  }

  setSideMenue() {
    this.storage.get('email').then((val) => {
      this.user_email = val;
      if(val != null){
        this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'shop Now',component:ScanBarCodePage},
          { title: 'profile',component:ProfilePage},
          { title: 'Cart' , component:CartPage},
          { title: 'Categories' , component:CategoriesPage},
          { title: 'History' , component:OrderHistoryPage}
        ];
      } else if(val == null) {
        this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'shop Now',component:ScanBarCodePage}
        ];
      }
    });
  }

  logOut() {
    this.storage.remove('email');
    console.log(this.user_email);
    this.nav.push(LoginPage);
    this.setSideMenue();
  }

  logIn() {
    this.nav.push(LoginPage);
    this.setSideMenue();
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
    this.nav.push(page.component);
  }
}
