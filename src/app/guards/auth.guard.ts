import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from '../Services/local-storage.service';

/**
 * Guard de ruta para proteger las rutas que requieren autenticación.
 * @param route Ruta actual
 * @param state Estado actual
 * @returns Verdadero si el usuario está autenticado, falso de lo contrario.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localService = inject(LocalStorageService);

  if(localService.getVariable('token')){
    return true;
  }
  else {
    router.navigate(['']);
    return false;
  }
};
