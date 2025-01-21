import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static isLogged: boolean = false;

  private storage: LocalStorageService = new LocalStorageService();

  constructor() { }

  loginStorage(user: string, pass: string, tipo: number|null): boolean{
    const listaUsuarios = this.storage.getItem('users') || [];

    const conectado = listaUsuarios.find((userFind: any) =>
       userFind.username == user && userFind.pass == pass && userFind.tipo == tipo);

    if(conectado){
      this.storage.setItem('conectado', conectado);
      return true;
    }else{
      return false;
    };
  };

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
