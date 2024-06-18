import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import * as authAction from "./auth.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { addCartSuccess } from "../cart/cart.actions";

export const registerEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(authAction.registerUser),
        switchMap(({user})=>{
            console.log(user);
            return authService.register(user).pipe(
                map(({data})=> {
                    console.log(data);
                    router.navigate(['/verify-email'], { queryParams: { email: data.user.email }})
                    return authAction.registerSuccess(data)
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    console.log(error.message);
                    return of(authAction.error({error:{message:error.error || error.statusText}}));
                })
            )
        })
    )
},{functional:true})

export const verifyOtpEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(authAction.verifyOtp),
        switchMap(({code,email})=>{
            return authService.verifyOtp({email,code}).pipe(
                map((data:any)=> {
                    console.log(data);
                    router.navigate(['/verify-success'])
                    return authAction.verifyOtpSuccess(data.message);
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    return of(authAction.error({error:{message:error.error || error.statusText}}));
                })
            )
        })
    )
},{functional:true})

export const resendOtpEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
        ofType(authAction.resendOtp),
        switchMap(({email,forgotPassword})=>{
            return authService.resendOtp({email,forgotPassword}).pipe(
                map((data:any)=> {
                    console.log(data);
                    return authAction.resendOtpSuccess(data.message);
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    return of(authAction.error({error:{message:error.error || error.statusText}}));
                })
            )
        })
    )
},{functional:true})

export const loginEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router),store = inject(Store)) => {
    return actions$.pipe(
        ofType(authAction.loginUser),
        switchMap(({user})=>{
            return authService.login(user).pipe(
                map(({data})=> {
                    localStorage.setItem("token", data.token)
                    localStorage.removeItem("uuid");
                    console.log(data);
                    if(data.carts){
                        store.dispatch(addCartSuccess({cart:data.carts}))
                    }
                    router.navigate(['/dashboard/wishlist'])
                    return authAction.loginSuccess({user:data.user});
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    return of(authAction.error({error:{message:error.error || error.statusText}}));
                })
            )
        })
    )
},{functional:true})

export const forgotPasswordEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(authAction.forgotPasswordOtp),
        switchMap(({email})=>{
            return authService.forgotPassword(email).pipe(
                map((data)=> {
                    console.log(data);
                    router.navigate(['/verify-email'], { queryParams: { email, 'forgot-password':true }})
                    return authAction.forgotPasswordOtpSuccess(data.message);
                }),
                catchError((error:HttpErrorResponse)=> {
                    return of(authAction.error({error:{message:error.error || error.statusText}}));
                })
            )
        })
    )
},{functional:true})

export const verifyForgotPasswordOtpEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(authAction.verifyForgotPasswordOtp),
        switchMap(({code,email})=>{
            return authService.verifyForgotPasswordOtp({code,email}).pipe(
                map((data)=> {
                    console.log(data);
                    router.navigate(['/reset-password'], {queryParams:{email}})
                    return authAction.verifyForgotPasswordOtpSuccess(data.message);
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    return of(authAction.error({error:{message:error.error || error.statusText}}));
                })
            )
        })
    )
},{functional:true})

export const resetPasswordEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(authAction.resetPassword),
        switchMap(({newPassword,email,confirmPassword})=>{
            return authService.resetPassword({newPassword,email,confirmPassword}).pipe(
                map((data)=> {
                    console.log(data);
                    router.navigate(['/reset-password'], {queryParams:{email}})
                    return authAction.resetPasswordSuccess(data.message);
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    return of(authAction.error({error:{message:error.error || error.statusText}}));
                })
            )
        })
    )
},{functional:true});

export const getUserEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(authAction.getUser),
        switchMap(()=>{
            return authService.getUser().pipe(
                map((data:any)=> {
                    return authAction.getUserSuccess({user:data.data});
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    return of(authAction.error({error:{message:error.error || error.statusText}}));
                })
            )
        })
    )
},{functional:true})
