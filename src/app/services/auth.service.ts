import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)

  register(data : any) : Observable<any>{
    console.log({data});
    return this.http.post(`${environment.apiUrl}/api/v1/auth/register`, data);
  }

  verifyOtp({code,token}:{code:number,token:string}) {
    return this.http.post(`${environment.apiUrl}/api/v1/auth/verify-email`,{code,token})
  }

  resendOtp({email}:{email:string | null,}) {
    return this.http.post(`${environment.apiUrl}/api/v1/auth/resend-otp`,{email})
  }

  login(data : {email: string, password: string}): Observable<any> {
    const uuid = localStorage.getItem("uuid") || ""
    console.log({data},uuid);
    return this.http.post(`${environment.apiUrl}/api/v1/auth/login`, {...data,uuid});
  }

  logout(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/auth/logout`);
  }

  forgotPassword(email: string): Observable<any> {
    console.log({email});
    return this.http.post(`${environment.apiUrl}/api/v1/auth/forgot-password`, {email});
  }



  resetPassword({newPassword,token,confirmPassword}:{token:string | null,newPassword:string,confirmPassword:string}): Observable<any> {
    console.log({newPassword,token});
    return this.http.post(`${environment.apiUrl}/api/v1/auth/reset-password`, {newPassword,token,confirmPassword});
  }
 
  getUser() {
    console.log("service");
    return this.http.get(`${environment.apiUrl}/api/v1/auth/user`)
  }

  // ============ Providing Assistance ================== //
  getCode (email:string){
    return this.http.get(`${environment.apiUrl}/api/v1/auth/getCode/${email}`)
  }

  getForgotPasswordCode (email:string){
    return this.http.get(`${environment.apiUrl}/api/v1/auth/getForgotPasswordCode/${email}`)
  }

}
