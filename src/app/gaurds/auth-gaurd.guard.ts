import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGaurd: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router = inject(Router);
  
  const token = localStorage.getItem("token") || '';
  // let token;
  console.log(token);
  if(!token){
    return router.createUrlTree(["/login"]);
  }else{
    return true;
  }
};
