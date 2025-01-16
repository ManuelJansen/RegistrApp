import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  user = {
    usuario: '',
    password: ''
  }

  tipo = "prof";

  msj = "";

  error = false;

  ingresar(){
    if(this.user.usuario.length>0 && this.user.password.length>0){
      if(this.user.usuario == "j.riquelme"){
        this.tipo = "prof"
      }else if(this.user.usuario == "m.jansen"){
        this.tipo = "alum"
      };

      if(this.tipo == "alum"){
        this.router.navigate(['home-alumno']);
        this.msj="";
        this.error=false;
        this.user.usuario = "";
        this.user.password = "";
      }else if(this.tipo == "prof"){
        this.router.navigate(['home']);
        this.msj="";
        this.error=false;
        this.user.usuario = "";
        this.user.password = "";
      };
    }else{
      this.error = true;
      this.msj = "Credenciales no pueden estar vacías"
    }
    
  }
}
