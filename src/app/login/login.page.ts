import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service';
import { LocalStorageService } from '../Servicios/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private animation: AnimationController, private auth: AuthService) { }

  ngOnInit() {
    this.animacion();
  }

  user = {
    usuario: '',
    password: ''
  };

  tipo = "";
  msj = "";

  error = false;
  carga = false;

  animacion() {
    const imagen = document.querySelector(
      'ion-card ion-card-content ion-img'
    ) as HTMLElement;
    const animacion = this.animation
      .create()
      .addElement(imagen)
      .duration(6000)
      .iterations(Infinity)
      .keyframes([
        {
          offset: 0,
          transform: 'translateX(0px)', 
        },
        {
          offset: 0.5,
          transform: 'translateX(200px)', 
        },
        {
          offset: 1,
          transform: 'translateX(0px)', 
        },
      ]);
    animacion.play();
  };

  ingresar(){
    if(this.user.usuario.length>0 && this.user.password.length>0){
      this.error = false;
      this.auth.loginApi(this.user.usuario, this.user.password).then((res)=>{
        if(res){
          console.log(res);
          let navigationExtras: NavigationExtras = {
            state: {user: this.user}
          };
          this.carga = true;
          this.tipo = this.auth.getRol();
          this.msj = "Conexión Exitosa";

          setTimeout(()=>{
            if(this.tipo == "alum"){
              this.router.navigate(['/home-alumno'], navigationExtras);
              this.msj = "";
              this.carga = false;
            }else{
              this.router.navigate(['/home'], navigationExtras);
              this.msj = "";
              this.carga = false;
            }
          }, 3000);
        }else{
          this.error = true;
          this.msj = "Credenciales Erróneas";
        };
      });
    }else{
      this.error = true;
      this.msj = "Credenciales no pueden estar vacías";
    };
  };

  /*ingresar(){
    if(this.user.usuario.length>0 && this.user.password.length>0){
      if(this.auth.loginStorage(this.user.usuario, this.user.password)){
        //Asignación de tipo de usuario
        if(this.user.usuario == "j.riquelme"){
          this.tipo = "prof"
        }else if(this.user.usuario == "m.jansen"){
          this.tipo = "alum"
        };
        //Navegación según tipo
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
          let navigationExtras: NavigationExtras = { state: { user: this.user }};
          setTimeout(()=> {
            this.router.navigate(['home'],navigationExtras);
            this.msj = "Conexion exitosa";
            this.error = false;
            this.carga = false;
          },3000);
        }else{
          this.msj = "Credenciales Erróneas"
        };
      };
    }else{
      //Error
      this.error = true;
      this.msj = "Credenciales no pueden estar vacías";
    };
  };
  */
  
  recargarPagina(){
    this.router.navigate(['login']);
    this.user.usuario="";
    this.user.password="";
  };
};
