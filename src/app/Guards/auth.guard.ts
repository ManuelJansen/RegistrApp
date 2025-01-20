import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const auth: AuthService = new AuthService();
  const router: Router = new Router();

  if(auth.isConected()){
    return true;
  }else{
    router.navigate(['/login']);

    //toast de error

    return false;
  };

};
