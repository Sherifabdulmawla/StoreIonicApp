
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class OrderService {
    public orders: any = [];

    orderUrl = "https://storewebservice.herokuapp.com/orders";
    constructor(private http: Http) {
        this.getAllOrders();
    }

    getAllOrders() {
        return this.http.get(this.orderUrl).map((response: Response) => response.json())
            .subscribe(data => {
                this.orders = data
            },
            (err) => console.log(`error happened getting todos ${err}`)
            );
    }
    get Orders() {
        return this.orders;
    }



    addorder(iduser,selectedTime,totalPrice,selectedAddress,selectedMobile) {
        console.log(selectedAddress);
        console.log(selectedTime);
        let newselectedtime=selectedTime.year+"-"+ selectedTime.month+"-"+selectedTime.day+ " " + selectedTime.hour+":"+selectedTime.minute
        let neworder = {
           "iduser":iduser,
           "status":1,
           "selectedtime":newselectedtime,
           "totalprice":totalPrice,
           "selectedaddress":selectedAddress,
           "selectedmobile":selectedMobile
        }
        console.log("new order",neworder);
        this.http.post(this.orderUrl, neworder).map((response: Response) => response.json())
            .subscribe(
            data => {
                this.orders.push(data);
            },
            (err) => console.log(`errror ${err}`)
            )
    }



}
