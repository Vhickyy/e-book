import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import * as authAction from "./auth.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { addCartSuccess, reset as cartReset } from "../cart/cart.actions";
import { getBooks, reset as bookReset } from "../book/book.actions";
import { reset } from "../library/library.actions";

export const registerEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(authAction.registerUser),
        switchMap(({user})=>{
            console.log(user);
            return authService.register(user).pipe(
                map(({data})=> {
                    console.log(data);
                    router.navigate(['/verify-email'], { queryParams: { email: user.get('email') }})
                    return authAction.registerSuccess(data)
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    console.log(error.message);
                    return of(authAction.error({error:{message:error.error.message || error.statusText}}));
                })
            )
        })
    )
},{functional:true})

export const verifyOtpEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(authAction.verifyOtp),
        switchMap(({code,token})=>{
            return authService.verifyOtp({code,token}).pipe(
                map((data:any)=> {
                    console.log(data);
                    router.navigate(['/verify-success'])
                    return authAction.verifyOtpSuccess(data.message);
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    return of(authAction.error({error:{message:error.error.message || error.statusText}}));
                })
            )
        })
    )
},{functional:true})

export const resendOtpEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
        ofType(authAction.resendOtp),
        switchMap(({email})=>{
            return authService.resendOtp({email}).pipe(
                map(({data}:any)=> {
                    return authAction.resendOtpSuccess({data});
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    return of(authAction.error({error:{message:error.error.message || error.statusText}}));
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
                    if(data.carts){
                        store.dispatch(addCartSuccess({cart:data.carts,viaLogin:true}))
                    }
                    store.dispatch(getBooks({category:"all",search:""}))
                    router.navigate(['/dashboard/wishlist'])
                    return authAction.loginSuccess({user:data.user});
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    return of(authAction.error({error:{message:error.error.message || error.statusText}}));
                })
            )
        })
    )
},{functional:true})

export const logoutEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router),store = inject(Store)) => {
    return actions$.pipe(
        ofType(authAction.logoutUser),
        switchMap(()=>{
            return authService.logout().pipe(
                map(()=> {
                    localStorage.removeItem("token");
                    store.dispatch(bookReset())
                    store.dispatch(cartReset())
                    store.dispatch(reset())
                    router.navigate(['/'])
                    return authAction.logoutSuccess();
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    localStorage.removeItem("token");
                    store.dispatch(bookReset())
                    store.dispatch(cartReset())
                    store.dispatch(reset())
                    router.navigate(['/'])
                    return of(authAction.error({error:{message:error.error.message || error.statusText}}));
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
                    return authAction.forgotPasswordOtpSuccess();
                }),
                catchError((error:HttpErrorResponse)=> {
                    return of(authAction.error({error:{message:error.error.message || error.statusText}}));
                })
            )
        })
    )
},{functional:true})


export const resetPasswordEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(authAction.resetPassword),
        switchMap(({newPassword,token,confirmPassword})=>{
            return authService.resetPassword({newPassword,token,confirmPassword}).pipe(
                map((data)=> {
                    console.log(data);
                    router.navigate(["/login"])
                    return authAction.resetPasswordSuccess(data.message);
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    return of(authAction.error({error:{message:error.error.message || error.statusText}}));
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
                    return of(authAction.error({error:{message:error.error.message || error.statusText}}));
                })
            )
        })
    )
},{functional:true});

export const getAuthorEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(authAction.getAuthor),
        switchMap(({id})=>{
            return authService.getAuthor(id).pipe(
                map((data:any)=> {
                    return authAction.getAuthorSuccess({user:data.data});
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log({error});
                    return of(authAction.error({error:{message:error.error.message || error.statusText}}));
                })
            )
        })
    )
},{functional:true});

export const becomeAuthorEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(authAction.becomeAuthor),
        switchMap(({authorData})=>{
            return authService.becomeAuthor(authorData).pipe(
                map(({data}:any)=> {
                    console.log({data},data.user);
                    
                    localStorage.setItem("token",data.token)
                    // router.navigate([''])
                    router.navigate([`/author/${data.user.fullname.split(' ')?.join('-')}/${data.user._id}`])
                    return authAction.becomeAuthorSuccess({user:data.user});
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log({error});
                    return of(authAction.error({error:{message:error.error.message || error.statusText}}));
                })
            )
        })
    )
},{functional:true});

export const getCodeEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(authAction.getCode),
        switchMap(({email})=>{
            return authService.getCode(email).pipe(
                map((data:any)=> {
                    console.log({data});
                    
                    return authAction.getCodeSuccess({data:data.data});
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    return of(authAction.error({error:{message:error.error.message || error.statusText}}));
                })
            )
        })
    )
},{functional:true})

export const getForgotPasswordCodeEffect = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(authAction.getForgotPasswordCode),
        switchMap(({email})=>{
            console.log({email},'gsgsf');
            
            return authService.getForgotPasswordCode(email).pipe(
                map((data:any)=> {
                    console.log("here");
                    
                    console.log({data});
                    
                    return authAction.getForgotPasswordCodeSuccess({data:data.data});
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log("here2");
                    
                    console.log(error);
                    return of(authAction.error({error:{message:error.error.message || error.statusText}}));
                })
            )
        })
    )
},{functional:true})
