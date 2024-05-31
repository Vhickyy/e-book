import { Store, createReducer, on } from "@ngrx/store";
import { addBook, addBookSuccess, addWishlist, bookFailure, getBook, getBookSuccess, getBooks, getBooksSuccess, placeInCart, removeWishlist } from "./book.actions";
import { inject } from "@angular/core";
import { selectCart } from "../cart/cart.selector";

export interface IBook {
    title: string,
    description: string,
    pages: number,
    price: number,
    category: string,
    date: Date,
    ISBN: number,
    publisher: string,
    keywords: string
}

export interface IBookState{
    // book: IBook[] | null,
    books: any
    loading: boolean,
    error: string | null,
    message: string | null,
    reviews: null,
    book: any,
    // incart: boolean | undefined
    pageSize: number,
    active: number
}

const initialState : IBookState = {
    books: null,
    loading: false,
    error: null,
    message: null,
    reviews: null,
    book: null,
    // incart: false,
    pageSize: 0,
    active: 0
}

export const bookReducer = createReducer(
    initialState,

    // add book
    on(addBook, (state) => ({...state,loading:true,error:null})),
    on(addBookSuccess, (state,action) => ({...state,loading:false,books:[...state.books,action.books]})),

    // get books
    on(getBooks, (state) => ({...state,loading:true,error:null})),
    on(getBooksSuccess, (state,action) => {
        console.log(action.books);
        return {...state,loading:false,books:action.books,pageSize:action.pageSize}
    }),

    // get book
    on(getBook, (state) => ({...state,loading:true,error:null})),
    on(getBookSuccess, (state,{book}) => {
        // const bool = inCart;
        console.log("booking");
        
        return {...state,loading:false,book}
    }),

    // edit book
    // on(getBook, (state) => ({...state,loading:true,error:null})),
    // on(getBookSuccess, (state,action) => ({...state,loading:false,book:action.book})),

    // // delete book
    // on(getBook, (state) => ({...state,loading:true,error:null})),
    // on(getBookSuccess, (state,action) => ({...state,loading:false,book:action.book})),

    // place in cart
    on(placeInCart,(state) => {
        console.log("placing in cart");
        return {...state,book:{...state.book,inCart:true}}
    }),

    // add to wishlist
    on(addWishlist,(state,{id}) => {
        const books = state.books.map((book: any,i: any) => {
            return book._id == id ? {...book,inWishlist:true} : book
        });
        return {...state,books}
    }),

    // remove from wishlist
    on(removeWishlist,(state,{id}) => {
        const books = state.books.map((book: any,i: any) => book._id == id ? {...book,inWishlist:false} : book);
        return {...state,books}
    }),


    // error
    on(bookFailure, (state,action) => ({...state,loading:false,error: action.error}))

)