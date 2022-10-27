import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
    authChange = new Subject<boolean>();
    private user!: User;

    registerUser(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.authChange.next(true);
    };

    login(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
    };

    logout(){
        this.user = {
            email: '',
            userId: ''
        }
        this.authChange.next(false);
    }

    getUser(){
        return {...this.user};
    }

    isAuth(){
        return this.user != null;
    }
}