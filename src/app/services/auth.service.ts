import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)

  register(data : any) : Observable<any>{
    console.log({data});
    return this.http.post("/api/v1/auth/register", data);
  }

  verifyOtp({code,email}:{email:string | null,code:number}) {
    return this.http.post("/api/v1/auth/verify-email",{code,email})
  }

  resendOtp({email,forgotPassword}:{email:string | null,forgotPassword?:string|null}) {
    if(forgotPassword) {
      return this.http.post("/api/v1/auth/resend-forgot-otp",{email})
    }
    return this.http.post("/api/v1/auth/resend-otp",{email})
  }

  login(data : {email: string, password: string}): Observable<any> {
    const uuid = localStorage.getItem("uuid") || ""
    console.log({data},uuid);
    return this.http.post("/api/v1/auth/login", {...data,uuid});
  }

  forgotPassword(email: string): Observable<any> {
    console.log({email});
    return this.http.post("/api/v1/auth/forgot-password", {email});
  }

  verifyForgotPasswordOtp({code,email}:{email:string | null,code:number}): Observable<any> {
    console.log({code,email});
    return this.http.post("/api/v1/auth/verify-forgot-otp", {code,email});
  }

  resetPassword({newPassword,email,confirmPassword}:{email:string | null,newPassword:string,confirmPassword:string}): Observable<any> {
    console.log({newPassword,email});
    return this.http.post("/api/v1/auth/reset-password", {newPassword,email,confirmPassword});
  }
 
  getUser() {
    console.log("service");
    
    return this.http.get("/api/v1/auth/user")
  }
}
