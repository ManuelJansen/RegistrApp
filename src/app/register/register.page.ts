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
