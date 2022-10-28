import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
    authChange = new Subject<boolean>();
    private user: User = {
        email: null,
        userId: null
    };

    constructor(private router: Router) { }

    registerUser(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.authSuccessfully();
    };

    login(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.authSuccessfully();
    };

    logout(){
        this.user = {
            email: null,
            userId: null
        }
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser(){
        return {...this.user};
    }

    isAuth(){
        return this.user.userId != null;
    }

    authSuccessfully(){
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}