import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
  standalone: false,
})
export class HomeAlumnoPage implements OnInit {

  constructor(private router: Router) { }

  user = {
    usuario: '',
    password: '',
  };
  nombreUsuario = '';
  ngOnInit() {
    this.user = history.state.user;
    this.nombreUsuario = this.user.usuario;
  }
  

  volverInicio(){
    this.router.navigate(["login"]);
    
  }

}
