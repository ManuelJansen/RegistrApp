import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

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

      if(this.tipo == "alum")
        {let navigationExtras: NavigationExtras = { state: { user: this.user }};
        this.router.navigate(['home-alumno'], navigationExtras);
        this.msj="";
        this.error=false;
      }else if(this.tipo == "prof")
        {let navigationExtras: NavigationExtras = { state: { user: this.user }}
        this.router.navigate(['home'],navigationExtras);
        this.msj="";
        this.error=false;
      };
    }else{
      this.error = true;
      this.msj = "Credenciales no pueden estar vacías"
    }
    
  }
  
  recargarPagina(){
    this.router.navigate(['login']);
    this.user.usuario="";
    this.user.password="";

  }
}
