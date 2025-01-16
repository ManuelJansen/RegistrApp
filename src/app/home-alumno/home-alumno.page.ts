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

  ngOnInit() {
  }

  saludar(){
    this.router.navigate(["login"])
  }

}
