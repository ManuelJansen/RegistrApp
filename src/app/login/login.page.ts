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
    /* Seleccionamos el elemento que deseamos utilizar para la animacion
       POr medio de un querySelector
    */
    const imagen = document.querySelector(
      'ion-card ion-card-content ion-img'
    ) as HTMLElement;
    /* Una vez seleccionamos , generamos la animacion por medio del animation controller
      Rectificar cada atributo en la documentacion 
      https://ionicframework.com/docs/utilities/animations
    */
    const animacion = this.animation
      .create()
      .addElement(imagen)
      .duration(6000)
      .iterations(Infinity)
      .keyframes([
        {
          offset: 0,
          transform: 'translateX(0px)', // Posición original
        },
        {
          offset: 0.5,
          transform: 'translateX(200px)', // Mover a 200px a la derecha
        },
        {
          offset: 1,
          transform: 'translateX(0px)', // Regresar a la posición original
        },
      ]);
    /* Por ultimo le damos play a la animacion para que empiece */
    animacion.play();
  }

  ingresar(){
    if(this.user.usuario.length>0 && this.user.password.length>0){
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
      };
    }else{
      //Error
      this.error = true;
      this.msj = "Credenciales no pueden estar vacías";
    };
  };
  
  recargarPagina(){
    this.router.navigate(['login']);
    this.user.usuario="";
    this.user.password="";
  };
};
