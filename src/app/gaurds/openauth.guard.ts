import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const openauthGuard: CanActivateFn = (route, state) => {
  const router:Router = inject(Router);
  const token = localStorage.getItem("token") || '';
  // let token;
  console.log(token);
  if(token){
    return router.createUrlTree(["/books"]);
  }else{
    return true;
  }
};
