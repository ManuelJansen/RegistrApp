import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private animation: AnimationController) { }

  ngOnInit() {
  }

  user = {
    usuario: '',
    password: ''
  }

  tipo = "prof";
  msj = "";

  error = false;
  carga = false;
  ingresar(){
    if(this.user.usuario.length>0 && this.user.password.length>0){
      if(this.user.usuario == "j.riquelme"){
        this.tipo = "prof"
      }else if(this.user.usuario == "m.jansen"){
        this.tipo = "alum"
      };

      if(this.tipo == "alum"){
        this.carga = true;
        let navigationExtras: NavigationExtras = { state: { user: this.user }};
        setTimeout(()=> {
          this.carga = true;
          this.router.navigate(['home-alumno'], navigationExtras);
          this.msj="Conexion exitosa";
          this.error = false;
          this.carga = false;
        },3000);
      }else if(this.tipo == "prof"){
        this.carga = true;
        let navigationExtras: NavigationExtras = { state: { user: this.user }}
        setTimeout(()=> {
          this.router.navigate(['home'],navigationExtras);
          this.msj = "Conexion exitosa";
          this.error = false;
          this.carga = false;
        },3000);
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
