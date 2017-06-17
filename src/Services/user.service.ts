import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
@Injectable()
export class UserService {

    public users: any = [];
    public user: any;

    title: string;
    quantity: number;
    price: number;
    description: string;
    mobiles;
    user_email;
    isLogged=null;

    userUrl = "https://storewebservice.herokuapp.com/users";
    useraddressUrl = "https://storewebservice.herokuapp.com/usersaddress";
    // usermobileUrl = "https://storewebservice.herokuapp.com/usersaddress"
    constructor(private http: Http) {
    }

    getUserByEmail(email: string) {
        return this.http.get(this.userUrl + "/" + email).map((response: Response) => response.json())
    }

    login(email: string, password: string) {
        return this.http.get(this.userUrl + "/" + email + "/" + password).map((response: Response) => response.json())
    }
    addUser(userName: string, email: string, password: string) {
        if (userName != "" && email != "" && password != "") {
            let newUser = {
                "name": userName,
                "email": email,
                "password": password
            }
            this.http.post(this.userUrl, newUser).map((response: Response) => response.json())
                .subscribe(
                data => {
                    this.users.push(data);
                },
                (err) => console.log(`errror ${err}`)
                )

        }
    }

    // listMobiles() {
    //     return this.http.get(this.user).map((response: Response) => response.json())
    //         .subscribe(data => {
    //             this.mobiles = data
    //     },
    //     err => console.log(`error happened getting todos ${err}`)
    //     );
    // }
}