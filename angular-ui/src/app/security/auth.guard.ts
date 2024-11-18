import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SocialService } from '../service/social.service';

export const authGuard: CanActivateFn = (route, state) => {

  const auth= inject(SocialService);
  const router = inject(Router);

  if(auth.isLoggedIn()){
    return true;
  }

  //access denied
  router.navigate(['/login']);
  return false;
};
