import { Component, OnInit } from '@angular/core';
import { RecuperarPassService } from '../Servicios/recuperar-pass.service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
  standalone: false,
})
export class RecuperarPassPage implements OnInit {

  constructor(private recupService: RecuperarPassService) { }

  numeroAleatorio: number|null = null;

  correoEnviado = false;

  generarNumero(): number|null{
    return Math.floor(100000 + Math.random() * 900000);
  };

  ngOnInit() {
  }
  user = {
    usuario: "",
    password: "",
    correo: "",
  }

  recuperar(){
    if (this.user.usuario.length>0 && this.user.correo.length>0){
      this.sendEmail(this.user.usuario, this.numeroAleatorio, this.user.correo);
    };
  };

  async sendEmail(nombre: string, codigo: number|null, mail:string){
    const formData = {
      user_email: mail,
      to_name: nombre,
      codigo: codigo,
    };
    try{
      const response = await this.recupService.sendEmail(formData);
      this.correoEnviado = true;
      console.log(response)
    }catch (error){
      console.error('Error enviando correo', error);
    }
  }
}
