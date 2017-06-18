import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrderDetailsPage } from "../order-details/order-details";
import { OrderService } from "../../Services/order.service";

@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {

  constructor(public orderservice:OrderService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');
  }

  showOrderDetails() {
    this.navCtrl.push(OrderDetailsPage);
  }
 getUserOders(){
  return  this.orderservice.orders;
 }
}
