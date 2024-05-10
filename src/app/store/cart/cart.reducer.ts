import { createReducer, on } from "@ngrx/store";
import {  addAnnonymousCart, addAnnonymousCartSuccess, addCart, addCartSuccess, addWishlist, addWishlistSuccess, cartError, clearAnnonymousCart, clearAnnonymousCartSuccess, clearCart, clearCartSuccess, getAnnonymousCart, getAnnonymousCartSuccess, getCart, getCartSuccess, getWishlist, getWishlistSuccess, removeAnnonymousCart, removeAnnonymousCartSuccess, removeCart, removeCartSuccess, removeWishlist, removeWishlistSuccess, } from "./cart.actions";


interface ICart  {
    loading: boolean
    cart: any,
    wishlist: any,
    error : string | null,
    message?: string | null
    cartLength: number
}

const initialState: ICart = {
    loading: false,
    cartLength: 0,
    cart: [],
    wishlist: [],
    error: null,
    message: null
}

export const cartReducer = createReducer(
    initialState,

    // add cart
    on(addCart,(state) => ({...state,loading:true,error:null})),
    on(addCartSuccess,(state,{message,cart}) => {
        // const count = state.cartLength + 1;
        console.log(cart);
        const count = cart.items.length;
        console.log(count,cart.items.length);
        return {...state,loading:false,message,cartLength:count,cart}
    }),

    // get cart
    on(getCart,(state) => ({...state,loading:true,error:null})),
    on(getCartSuccess,(state,{cart}) => {
        // console.log(cart);
        return {...state,loading:false,cart,cartLength:cart?.items?.length || 0}
    }),

    // remove cart
    on(removeCart,(state) => ({...state,loading:true,error:null})),
    on(removeCartSuccess,(state,{cart,message}) => {
        return {...state,loading:false,message,cart,cartLength:cart.items.length}
    }),

    // clear cart
    on(clearCart,(state) => ({...state,loading:true,error:null})),
    on(clearCartSuccess,(state,{message,cart}) => ({...state,loading:false,message,cart})),


    // add annonymous cart
    on(addAnnonymousCart,(state) => ({...state,loading:true,error:null})),
    on(addAnnonymousCartSuccess,(state,{message,cart}) => {
        const count = cart.items.length;
        console.log(state.cartLength);
        return {...state,loading:false,message,cartLength:count,cart}
    }),

    // get annonymous cart
    on(getAnnonymousCart,(state) => ({...state,loading:true,error:null})),
    on(getAnnonymousCartSuccess,(state,{cart}) => {
        console.log(cart);
        return {...state,loading:false,cart,cartLength:cart?.items?.length || 0}
    }),

    // remove annonymous cart
    on(removeAnnonymousCart,(state) => ({...state,loading:true,error:null})),
    on(removeAnnonymousCartSuccess,(state,{cart,message}) => ({...state,loading:false,message,cartLength:cart.items.length,cart})),

    // clear annonymous cart
    on(clearAnnonymousCart,(state) => ({...state,loading:true,error:null})),
    on(clearAnnonymousCartSuccess,(state,{message,cart}) => ({...state,loading:false,message,cart,cartLength:state.cart.length})),

    
    // add wishlist
    on(addWishlist, (state) => ({...state,loading:true,error:null})),
    on(addWishlistSuccess, (state,{message,wishlist}) => ({...state,loading:false,message,wishlist})),

    // get wishlist
    on(getWishlist, (state) => ({...state,loading:true,error:null})),
    on(getWishlistSuccess, (state,{message,wishlist}) => ({...state,message,wishlist})),
    
    // remove wishlist
    on(removeWishlist, (state) => ({...state,loading:true,error:null})),
    on(removeWishlistSuccess, (state,{message,wishlist}) => ({...state,message,wishlist})),


    on(cartError,(state,action)=> ({...state,loading:false,error:action.error})),
)