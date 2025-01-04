import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from '../Services/local-storage.service';

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
