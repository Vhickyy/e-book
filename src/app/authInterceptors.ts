import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { error } from './store/auth/auth.actions';

export const authInterceptor: HttpInterceptorFn = (request, next) => {

  console.log('request');
  
  const frontendUrl = window.location.href
  // console.log(frontendUrl);
  
  const token = localStorage.getItem("token") || '';
    const router = inject(Router)
    // console.log("ji");
    // console.log(token);
    // console.log(request);
    
    // console.log(frontendUrl.includes("dashboard") && token);
    // console.log({token});
    
    if(token){
      const modifiedReq = request.clone({headers : request.headers.append("Authorization", "Bearer " + token)});
      console.log("hi");
      
      return next(modifiedReq).pipe(
        tap(
          {
            next: _e => {},
            error: error => {
              if(error instanceof HttpErrorResponse && error.status === 401){
                localStorage.removeItem("token");
                localStorage.removeItem("uuid")
                router.navigate(["/login"]);
              }
            }
          }
        ))
    }

    console.log("hetfr");
    
    
    // return next(request);

  // return next(request).pipe(
  //   tap(
  //     {
  //       next: _e => {},
  //       error: error => {
  //         if(error instanceof HttpErrorResponse && error.status === 500){
  //           localStorage.removeItem("token");
  //           localStorage.removeItem("uuid")
  //           router.navigate(["/login"]);
  //         }
  //       }
  //     }
  //   )
  // );
  return next(request);
};