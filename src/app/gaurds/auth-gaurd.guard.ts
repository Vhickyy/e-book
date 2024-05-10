import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGaurdGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router = inject(Router);
  
  const token = JSON.parse(localStorage.getItem("token") || '')
  console.log(token);
  if(!token){
    router.navigate(["/login"]);
    return false
  }
  return true;
};
