import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product';

import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'page-products-list',
  templateUrl: 'products-list.html',
})
export class ProductsListPage {

  cat_id:number;
  cat_name:string;
  products:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public productService:ProductService) {
    this.cat_id=navParams.get("categoryId");
    this.cat_name = navParams.get("categoryName");
    this.ListProduct();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsListPage');
  }

  showProduct($event,productId,productName) {
    this.navCtrl.push(ProductPage,{
      "productId":productId,
      "productName":productName
    })
  }

  ListProduct() {
      this.productService.getproductbycategory(this.cat_id,this.cat_id).subscribe(data => {
        this.products = data
        console.log(`the data ${data}`);
      },
      err => console.log(`error happened getting products ${err}`)
      );
  }

}