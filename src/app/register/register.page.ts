import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../Servicios/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  constructor(
    private router: Router,
    private animation: AnimationController,
    private auth: AuthService,
    private toast: ToastController,
    private api: ApiService,
  ) {}

  ngOnInit() {}

  user = {
    usuario: '',
    correo: '',
    password: '',
    tipo: '',
  };

  tipo = '';
  msj = '';

  error = false;
  carga = false;

  errApi = "";

  registerApi(){
    if (this.user.usuario.length>0 && this.user.correo.length>0 &&
        this.user.password.length>0 &&this.user.tipo.length>0){
          const nuevoUsuario = {
            username: this.user.usuario,
            correo: this.user.correo,
            pass: this.user.password,
            rol: this.user.tipo
          }
          this.auth.registerApi(this.user.usuario, nuevoUsuario).then((res)=>{
            if(res){
              this.errApi = this.auth.getErrMsg();
              console.log(this.errApi);
              console.log(res);
            };
          });
    } else {
      this.msj = "Verifique los datos";
    };
  };
  

  registrar() {
    //Verificamos que los campos tengan valor
    if (
      this.user.usuario.trim().length > 0 ||
      this.user.password.trim().length > 0 ||
      this.user.tipo.trim().length > 0
    ) {
      //Verificar si el registro se realizo
      if (
        this.auth.registrar(
          this.user.usuario,
          this.user.password,
          this.user.tipo
        )
      ) {
        this.generarToast('Registro Exitoso \n Redireccionando');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      } else {
        this.generarToast('Correo o usuario ya existen');
      }
    } else {
      this.generarToast('Credenciales no pueden estar vacias');
    }
  }
  generarToast(mensaje: string) {
    const toast = this.toast.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
    });
    toast.then((res) => {
      res.present();
    });
  }

  recargarPagina() {
    this.router.navigate(['login']);
    this.user.usuario = '';
    this.user.password = '';
    this.user.tipo = '';
  }
}
