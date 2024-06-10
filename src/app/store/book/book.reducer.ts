import { Store, createReducer, on } from "@ngrx/store";
import { addBook, addBookSuccess, addId, addWishlist, bookFailure, deleteBook, deleteBookSuccess, editBook, editBookSuccess, getAuthorBooks, getAuthorBooksSuccess, getBook, getBookSuccess, getBooks, getBooksSuccess, placeInCart, removeId, removeWishlist } from "./book.actions";
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
    pageSize: number,
    active: number
    authorBooks: any
    ids:string[]
}

const initialState : IBookState = {
    books: null,
    loading: false,
    error: null,
    message: null,
    reviews: null,
    book: null,
    pageSize: 0,
    active: 0,
    authorBooks: null,
    ids: []
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

    // get books
    on(getAuthorBooks, (state) => ({...state,loading:true,error:null})),
    on(getAuthorBooksSuccess, (state,action) => {
        console.log(action.authorBooks);
        return {...state,loading:false,authorBooks:action.authorBooks}
    }),

    // get book
    on(getBook, (state) => ({...state,loading:true,error:null})),
    on(getBookSuccess, (state,{book}) => {
        // const bool = inCart;
        console.log("booking");
        
        return {...state,loading:false,book}
    }),

    // edit book
    on(editBook, (state) => ({...state,loading:true,error:null})),
    on(editBookSuccess, (state,action) => {
        const authorBooks = state.authorBooks.map((book:any) => book._id == action.id ? action.book : book)
        return {...state,loading:false,authorBooks}
    }),

    // delete book
    on(deleteBook, (state) => ({...state,loading:true,error:null})),
    on(deleteBookSuccess, (state,action) => {
        const authorBooks = state.authorBooks.filter((book:any) => book._id !== action.id)
        return {...state,loading:false,authorBooks}
    }),

    // place in cart
    on(placeInCart,(state) => {
        console.log("placing in cart");
        return {...state,book:{...state.book,inCart:true}}
    }),


    // id array
    on(addId,(state,{id}) => {
        // console.log(id);
        // const newId = [...state.ids,id]
        // console.log({newId});
        
        return {...state,ids:[...state.ids,id]};
    }),
   
    on(removeId,(state,{id}) => {
        const ids = state.ids.filter(id => id !== id)
        return {...state,ids:[...state.ids,id]}
        // return {...state,book:{...state.book,inCart:true,ids}}
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
        const books = state.books?.map((book: any,i: any) => book._id == id ? {...book,inWishlist:false} : book);
        return {...state,books}
    }),


    // error
    on(bookFailure, (state,action) => ({...state,loading:false,error: action.error}))

)