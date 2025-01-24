import { Component, OnInit } from '@angular/core';
import { RecuperarPassService } from '../Servicios/recuperar-pass.service';
import { AuthService } from '../Servicios/auth.service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
  standalone: false,
})
export class RecuperarPassPage implements OnInit {

  constructor(private recupService: RecuperarPassService, private auth: AuthService) { }

  numeroAleatorio: number|null = null;

  numeroIngresado: number|null = null;

  correoEnviado = false;

  carga = false;

  error = false;

  generarNumero(): number|null{
    return Math.floor(100000 + Math.random() * 900000);
  };

  ngOnInit() {
  };

  user = {
    usuario: "",
    password: "",
    correo: "",
  };




  recuperar(){
    if (this.user.usuario.length>0 && this.user.correo.length>0){
      this.error = false;
      this.carga = true;
      this.numeroAleatorio = this.generarNumero();
      this.sendEmail(this.user.usuario, this.numeroAleatorio, this.user.correo);
    }else{
      this.error = true;
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
      this.carga = false;
      this.correoEnviado = true;
      console.log(response);
    }catch (error){
      console.error('Error enviando correo', error);
      this.error = true;
      this.carga = false;
    };
  };

  comparar(){
    if(this.numeroIngresado == this.numeroAleatorio){
      console.log('numeross iguales');
    }else{
      console.log('verificar numeros');
    };
  };
};
