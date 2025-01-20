import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static isLogged: boolean = false;

  constructor() { }

  login(user:string, pass:string):boolean{
    if (user=="j.riquelme" && pass=="pass1234"){
      AuthService.isLogged = true;
      return true;
    }else if(user=="m.jansen" && pass=="pass1234"){
      AuthService.isLogged = true;
      return true;
    }else{
      return false;
    };
  };

  isConected():boolean{
    return AuthService.isLogged;
  };

  logOut(){
    AuthService.isLogged = false;
  };
};
