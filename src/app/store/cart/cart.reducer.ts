import { createReducer, on } from "@ngrx/store";
import {  addAnnonymousCart, addAnnonymousCartSuccess, addCart, addCartSuccess, addId, addWishlist, addWishlistSuccess, cartError, clearAnnonymousCart, clearAnnonymousCartSuccess, clearCart, clearCartSuccess, getAnnonymousCart, getAnnonymousCartSuccess, getCart, getCartSuccess, getOrders, getOrdersSuccess, getWishlist, getWishlistSuccess, hideError, orderBooks, orderBooksSuccess, removeAnnonymousCart, removeAnnonymousCartSuccess, removeCart, removeCartSuccess, removeId, removeWishlist, removeWishlistSuccess, reset, verifyPayment, verifyPaymentSuccess, } from "./cart.actions";
import { IBook, ICart } from "../../Model/Book";


interface ICartState  {
    loading: boolean
    cart: ICart,
    wishlist: IBook[] | null,
    error: {message:string} | null,
    message?: string | null
    cartLength: number
    orders: any
    ids:string[]
}

const initialState: ICartState = {
    loading: false,
    cartLength: 0,
    cart: {
        items: [],
        orderValue: 0
    },
    wishlist: null,
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
        const count = state.cart.items?.length ? state.cart.items.length + 1 : (cart?.items?.length || 0);
        return {...state,loading:false,message,cartLength:count,cart}
    }),

    // get cart
    on(getCart,(state) => ({...state,loading:true,error:null})),
    on(getCartSuccess,(state,{cart}) => {
        return {...state,loading:false,cart,cartLength:cart?.items?.length || 0}
    }),

    // remove cart
    on(removeCart,(state) => ({...state,loading:true,error:null})),
    on(removeCartSuccess,(state,{id,message,price}) => {
        const newItems =  state.cart.items.filter((item) => item._id !== id);
        return {...state,loading:false,message,cart:{...state.cart,items:newItems,orderValue:price.orderValue},cartLength:state.cart.items.length - 1}
    }),

    // clear cart
    // on(clearCart,(state) => ({...state,loading:true,error:null})),
    // on(clearCartSuccess,(state,{message,cart}) => ({...state,loading:false,message,cart})),


    // add annonymous cart
    on(addAnnonymousCart,(state) => ({...state,loading:true,error:null})),
    on(addAnnonymousCartSuccess,(state,{message,cart}) => {
        const count = cart.items.length;
        return {...state,loading:false,message,cartLength:count,cart}
    }),

    // get annonymous cart
    on(getAnnonymousCart,(state) => ({...state,loading:true,error:null})),
    on(getAnnonymousCartSuccess,(state,{cart}) => {
        console.log({cart});
        return {...state,loading:false,cart,cartLength:cart?.items?.length || 0}
    }),

    // remove annonymous cart
    on(removeAnnonymousCart,(state) => ({...state,loading:true,error:null})),
    on(removeAnnonymousCartSuccess,(state,{cart,message}) => ({...state,loading:false,message,cartLength:cart.items.length,cart})),

    // clear annonymous cart
    // on(clearAnnonymousCart,(state) => ({...state,loading:true,error:null})),
    // on(clearAnnonymousCartSuccess,(state,{message,cart}) => ({...state,loading:false,message,cart,cartLength: 0})),

    
    // add wishlist
    on(addWishlist, (state) => ({...state,loading:true,error:null})),
    on(addWishlistSuccess, (state,{message,wishlist,id}) => {
        const wishlistItems = [wishlist,...(state?.wishlist || [])];
        
        const items = state?.cart?.items?.map((item) => item._id === id ? {...item,inWishlist:true} : item) || [];
        return {...state,loading:false,message,wishlist:wishlistItems,cart:{...state.cart,items}}
    }),

    // get wishlist
    on(getWishlist, (state) => ({...state,loading:true,error:null})),
    on(getWishlistSuccess, (state,{message,wishlist}) => ({...state,loading:false,message,wishlist})),
    
    // remove wishlist
    on(removeWishlist, (state) => ({...state,loading:true,error:null})),
    on(removeWishlistSuccess, (state, { message, id }) => {
        const wishlist = state?.wishlist?.filter((book: IBook) => book._id !== id) || [];
        const items = state.cart.items.map((item) =>
            item._id === id ? { ...item, inWishlist: false } : item
        );

        return {
            ...state,
            loading: false,
            message,
            wishlist,
            cart: {
                ...state.cart,
                items
            }
        };
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
        return {...state,ids:[...state.ids,id]};
    }),
   
    on(removeId,(state,{id}) => {
        const ids = state.ids.filter(id => id !== id);
        return {...state,ids}
    }),


    on(cartError,(state,action)=> {
        
        return {...state,loading:false,error:{message:action.error.message}}
    }),

    on(hideError, (state) => {
       return {...state,error: null}
    }),

    on(reset, (state) => (initialState)),
    
)