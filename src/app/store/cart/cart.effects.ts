import { Inject, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CartService } from "../../services/cart.service";
import * as cartAction from "../cart/cart.actions"
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import {  addWishlist, placeInCart, removeWishlist } from "../book/book.actions";


export const addCartEffect = createEffect((action$ = inject(Actions),router = inject(Router), cartService = inject(CartService),store = inject(Store)) => {
    return action$.pipe(
        ofType(cartAction.addCart),
        switchMap(({id})=>{
            console.log(id);
            // store.dispatch(getBook({id:"hj"}))
            return cartService.addCart(id).pipe(
                map((data:any) => {
                    console.log(data);
                    console.log(data.data);
                    
                    store.dispatch(placeInCart())

                    return cartAction.addCartSuccess({message:data.message,cart:data.data})
                }),
                catchError((error:HttpErrorResponse) => of(cartAction.cartError(error)))
            )
        })
    )
},{functional:true});


export const removeItemEffect = createEffect((action$ = inject(Actions), router = inject(Router), cartService = inject(CartService)) => {
    return action$.pipe(
        ofType(cartAction.removeCart),
        switchMap(({id}) => {
            return cartService.removeCart(id).pipe(
                map((data:any) => {
                    console.log(data);
                    return cartAction.removeCartSuccess({cart:data.data,message:data.message})
                }),
                catchError((error:HttpErrorResponse) => of(cartAction.cartError(error)))
            )
        })
    )
},{functional:true});


export const getCartEffect = createEffect( (action$ = inject(Actions), router = inject(Router), cartService = inject(CartService), activatedRoute = inject(ActivatedRoute), store=inject(Store)) => {
    return action$.pipe(
        ofType(cartAction.getCart),
        switchMap(() => {
            localStorage.removeItem("uuid")
            return cartService.getCart().pipe(
                map((data:any) => {
                    console.log(data);
                    
                    return cartAction.getCartSuccess({cart:data.data})
                }),
                catchError((error:HttpErrorResponse) => of(cartAction.cartError(error)))
            )
        })
    )
},{functional:true})


export const clearCartEffect = createEffect ((action$ = inject(Actions), router = inject(Router), cartService = inject(CartService)) => {
    return action$.pipe(
        ofType(cartAction.clearCart),
        switchMap(({id}) => {
            return cartService.clearCart(id).pipe(
                map((data:any) => {
                    console.log(data);
                    return cartAction.clearCartSuccess(data.data);
                }),
                catchError((error:HttpErrorResponse) => of(cartAction.cartError(error)))
            )
        })
    )
},{functional:true});


export const addAnnonymousCartEffect = createEffect((action$ = inject(Actions),router = inject(Router), cartService = inject(CartService), store = inject(Store)) => {
    return action$.pipe(
        ofType(cartAction.addAnnonymousCart),
        switchMap(({id})=>{
            // generate uuid here
            let uuid = localStorage.getItem("uuid") as string;
            if(!uuid){
                localStorage.setItem("uuid","hello")
                uuid = localStorage.getItem("uuid")!;
            }
            return cartService.addAnonymousCart(id,uuid).pipe(
                map((data:any) => {
                    console.log("placing in cart",{data});
                    store.dispatch(placeInCart())
                    return cartAction.addAnnonymousCartSuccess({message:data.message,cart:data.data})
                }),
                catchError((error:HttpErrorResponse) => of(cartAction.cartError(error)))
            )
        })
    )
},{functional:true});

export const removeAnnonymousItemEffect = createEffect((action$ = inject(Actions), router = inject(Router), cartService = inject(CartService)) => {
    return action$.pipe(
        ofType(cartAction.removeAnnonymousCart),
        switchMap(({id}) => {
            return cartService.removeAnonymousCart(id).pipe(
                map((data:any) => {
                    console.log(data);
                    return cartAction.removeAnnonymousCartSuccess({cart:data.data,message:data.message})
                }),
                catchError((error:HttpErrorResponse) => of(cartAction.cartError(error)))
            )
        })
    )
},{functional:true});


export const getAnnonymousCartEffect = createEffect( (action$ = inject(Actions), router = inject(Router), cartService = inject(CartService)) => {
    return action$.pipe(
        ofType(cartAction.getAnnonymousCart),
        switchMap(() => {
            return cartService.getAnnonymousCart().pipe(
                map(({data}:any) => {
                    console.log(data.cart);
                    return cartAction.getAnnonymousCartSuccess({cart:data.cart})
                }),
                catchError((error:HttpErrorResponse) => of(cartAction.cartError(error)))
            )
        })
    )
},{functional:true})


export const clearAnnonymousCartEffect = createEffect ((action$ = inject(Actions), router = inject(Router), cartService = inject(CartService)) => {
    return action$.pipe(
        ofType(cartAction.clearAnnonymousCart),
        switchMap(({id}) => {
            return cartService.clearAnonymousCart(id).pipe(
                map((data:any) => {
                    console.log(data);
                    return cartAction.clearAnnonymousCartSuccess(data.data);
                }),
                catchError((error:HttpErrorResponse) => of(cartAction.cartError(error)))
            )
        })
    )
},{functional:true});


export const addWishlistEffect = createEffect ((action$ = inject(Actions), router = inject(Router), cartService = inject(CartService), store= inject(Store)) =>{
    return action$.pipe(
        ofType(cartAction.addWishlist),
        switchMap(({id})=>{
            // console.log(id);
            return cartService.addToWishlist(id).pipe(
                map( ({data}:any) => {
                    console.log(data);
                    store.dispatch(addWishlist({id}))
                    return cartAction.addWishlistSuccess({message:data.message,wishlist:data.wishlist})
                }),
                catchError((error:HttpErrorResponse) => of(cartAction.cartError(error)))
            )
        })
    )
},{functional:true});


export const getWishlistEffect = createEffect((action$ = inject(Actions), router = inject(Router), cartService = inject(CartService)) => {
    return action$.pipe(
        ofType(cartAction.getWishlist),
        switchMap(() => {
            return cartService.getWishlist().pipe(
                map(({data}:any) => {
                    console.log(data.items);
                    return cartAction.getWishlistSuccess({message:data.message,wishlist:data.items})
                }),
                catchError((error:HttpErrorResponse) => of(cartAction.cartError(error)))
            )
        })
    )
},{functional:true});


export const removeWishlistEffect = createEffect((action$ = inject(Actions), router = inject(Router), cartService = inject(CartService), store=inject(Store)) => {
    return action$.pipe(
        ofType(cartAction.removeWishlist),
        switchMap(({id}) => {
            return cartService.removeFromWishlist(id).pipe(
                map((data:any) => {
                    console.log(data);
                    store.dispatch(removeWishlist({id}))
                    return cartAction.removeWishlistSuccess(data.message)
                }),
                catchError((error:HttpErrorResponse) => of(cartAction.cartError(error)))
            )
        })
    )
},{functional:true});


export const orderBooks = createEffect((action$ = inject(Actions), router = inject(Router),  cartService = inject(CartService)) => {
    return action$.pipe(
        ofType(cartAction.orderBooks),
        switchMap(({id}) => {
            return cartService.makePayment(id).pipe(
                map((data:any) => {
                    console.log(data.order.authorization_url,data.order.reference);
                    // router.navigate([`/dashboard/verify-payment`],{queryParams: { reference:data.order.reference },replaceUrl:true});
                    const newUrl = `/dashboard/verify-payment?reference=${data.order.reference}`
                    // history.pushState(null,'',newUrl);
                    window.location.href = data.order.authorization_url;
                    return cartAction.orderBooksSuccess(data)
                })
            )
        }),
        catchError((error:HttpErrorResponse) => of(cartAction.cartError(error)))
    )
},{functional:true});


export const verifyPayment = createEffect((action$ = inject(Actions), router = inject(Router), cartService = inject(CartService), store=inject(Store)) => {
    return action$.pipe(
        ofType(cartAction.verifyPayment),
        switchMap(({reference}) => {
            return cartService.verifyPayment(reference).pipe(
                map(() => {
                    store.dispatch(cartAction.getCart())
                    return cartAction.verifyPaymentSuccess();
                })
            )
        }),
        catchError((error:HttpErrorResponse) => of(cartAction.cartError(error)))
    )
},{functional:true})