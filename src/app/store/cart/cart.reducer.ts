import { createReducer, on } from "@ngrx/store";
import {  addAnnonymousCart, addAnnonymousCartSuccess, addCart, addCartSuccess, addId, addWishlist, addWishlistSuccess, cartError, clearAnnonymousCart, clearAnnonymousCartSuccess, clearCart, clearCartSuccess, getAnnonymousCart, getAnnonymousCartSuccess, getCart, getCartSuccess, getOrders, getOrdersSuccess, getWishlist, getWishlistSuccess, orderBooks, orderBooksSuccess, removeAnnonymousCart, removeAnnonymousCartSuccess, removeCart, removeCartSuccess, removeId, removeWishlist, removeWishlistSuccess, verifyPayment, verifyPaymentSuccess, } from "./cart.actions";


interface ICart  {
    loading: boolean
    cart: any,
    wishlist: any,
    error: {message:string} | null,
    message?: string | null
    cartLength: number
    orders: any
    ids:string[]
}

const initialState: ICart = {
    loading: false,
    cartLength: 0,
    cart: [],
    wishlist: [],
    error: null,
    message: null,
    orders: null,
    ids: []
}

export const cartReducer = createReducer(
    initialState,

    // add cart
    on(addCart,(state) => ({...state,loading:true,error:null})),
    on(addCartSuccess,(state,{message,cart}) => {
        const count = cart?.items?.length || 0;
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
    on(addWishlistSuccess, (state,{message,wishlist}) => {
        const wishlistItems = [wishlist,...state.wishlist];
        return {...state,loading:false,message,wishlist:wishlistItems}
    }),

    // get wishlist
    on(getWishlist, (state) => ({...state,loading:true,error:null})),
    on(getWishlistSuccess, (state,{message,wishlist}) => ({...state,loading:false,message,wishlist})),
    
    // remove wishlist
    on(removeWishlist, (state) => ({...state,loading:true,error:null})),
    on(removeWishlistSuccess, (state,{message,id}) => {
        const wishlist = state.wishlist?.filter((book:any) => book._id !== id)
        return {...state,loading:false,message,wishlist}
    }),

    // order book
    on(orderBooks, (state) => ({...state,loading:true,error:null})),
    on(orderBooksSuccess,(state) => ({...state,loading:false})),

    // verify book
    on(verifyPayment, (state) => ({...state,loading:true,error:null})),
    on(verifyPaymentSuccess,(state) => ({...state,loading:false})),

    on(getOrders, (state) => ({...state,loading:true,error:null})),
    on(getOrdersSuccess, (state,{orders}) => ({...state,loading:false,orders})),


     // id array
     on(addId,(state,{id}) => {
        console.log(state.ids);
        
        console.log(id);
        const nrewd = [...state.ids,id]
        console.log({nrewd});
        
        return {...state,ids:[...state.ids,id]};
    }),
   
    on(removeId,(state,{id}) => {
        const ids = state.ids.filter(id => id !== id);
        return {...state,ids}
    }),


    on(cartError,(state,action)=> ({...state,loading:false,error:{message:action.error.message}})),
    
)