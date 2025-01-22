import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static isLogged: boolean = false;

  private storage: LocalStorageService = new LocalStorageService();

  private router: Router = new Router();

  constructor() { }

  loginStorage(user: string, pass: string): boolean{
    const listaUsuarios = this.storage.getItem('users') || [];

    const conectado = listaUsuarios.find((userFind: any) =>
       userFind.username == user && userFind.pass == pass);

    if(conectado){
      this.storage.setItem('conectado', conectado);
      return true;
    }else{
      return false;
    };
  };

  registrar(user: string, pass: string, tipo: string){
    const listaUsuarios = this.storage.getItem('users') || [];

    if(listaUsuarios.find(
      (userFind: any) =>
        userFind.username == user
    )){
      return false;
    };

    const nuevoUsuario = {
      id: listaUsuarios.length + 1,
      username: user,
      tipo: tipo,
      pass: pass,
    };

    listaUsuarios.push(nuevoUsuario);

    this.storage.setItem('users', listaUsuarios);
    return true;
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
    return this.storage.getItem('conectado') !== null;
  };

  logOut(){
    this.storage.removeItem('conectado');
  };
};
