import { createAction, props } from "@ngrx/store";


// add cart
export const addCart = createAction('[Cart] addCart', props<{id:string | null}>());
export const addCartSuccess = createAction('[Cart] addCartSuccess',props<{message?:string,cart:any}>());

// get cart
export const getCart = createAction('[Cart] getCart')
export const getCartSuccess = createAction('[Cart] getCartSuccess', props<{cart:any}>());

// remove cart
export const removeCart = createAction('[Cart] removeCart',props<{id:string}>())
export const removeCartSuccess = createAction('[Cart] removeCartSuccess', props<{cart:any,message:string}>());

// clear cart
export const clearCart = createAction('[Cart] clearCart',props<{id:string}>());
export const clearCartSuccess = createAction('[Cart] clearCartSuccess',props<{message:string,cart:null}>());


// add annonymous cart
export const addAnnonymousCart = createAction('[Cart] addAnnonymousCart', props<{id:string | null}>());
export const addAnnonymousCartSuccess = createAction('[Cart] addAnnonymousCartSuccess', props<{message?:string,cart:any}>());

// get annonymous cart
export const getAnnonymousCart = createAction('[Cart] getAnnonymousCart')
export const getAnnonymousCartSuccess = createAction('[Cart] getAnnonymousCartSuccess', props<{cart:any}>());

// remove annonymous cart
export const removeAnnonymousCart = createAction('[Cart] removeAnnonymousCart',props<{id:string}>())
export const removeAnnonymousCartSuccess = createAction('[Cart] removeAnnonymousCartSuccess', props<{cart:any,message:string}>());

// clear annonymous cart
export const clearAnnonymousCart = createAction('[Cart] clearAnnonymousCart',props<{id:string}>());
export const clearAnnonymousCartSuccess = createAction('[Cart] clearAnnonymousCartSuccess',props<{message:string,cart:null}>());


// add wishlist
export const addWishlist = createAction('[Cart] addWishlist', props<{id:string}>());
export const addWishlistSuccess = createAction('[Cart] addWishlistSuccess', props<{message:string,wishlist:any}>());

// get wishlist
export const getWishlist = createAction('[Cart] getWishlist');
export const getWishlistSuccess = createAction('[Cart] getWishlistSuccess', props<{message:string,wishlist:any}>());

// remove wishlist
export const removeWishlist = createAction('[Cart] removeWishlist', props<{id:string}>());
export const removeWishlistSuccess = createAction('[Cart] removeWishlistSuccess', props<{message:string,id:string | null}>());

// clear wishlist
export const clearWishlist = createAction('[Cart] clearWishlist', props<{id:string}>());
export const clearWishlistSuccess = createAction('[Cart] clearWishlistSuccess', props<{message:string,wishlist:any}>());

// order books
export const orderBooks = createAction('[Order] orderBooks',props<{id:string,single:boolean}>())
export const orderBooksSuccess = createAction('[Order] orderBooksSuccess',props<{data:any}>());

// verify payment
export const verifyPayment = createAction('[Order] verifyPayment',props<{reference:string | null}>())
export const verifyPaymentSuccess = createAction('[Order] verifyPaymentSuccess');

// get orders
export const getOrders = createAction('[Order] getOrders')
export const getOrdersSuccess = createAction('[Order] getOrdersSuccess',props<{orders:any}>())


// id array
export const addId = createAction('[Cart] addId',props<{id:string}>());
export const removeId = createAction('[Cart] removeId',props<{id:string}>());


export const cartError = createAction('[Cart] cartError',props<{error:{message:string}}>());
