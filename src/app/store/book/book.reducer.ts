import { Store, createReducer, on } from "@ngrx/store";
import { addBook, addBookSuccess, addId, addWishlist, bookFailure, deleteBook, deleteBookSuccess, editBook, editBookSuccess, getAuthorBooks, getAuthorBooksSuccess, getBook, getBookSuccess, getBooks, getBooksSuccess, hideError, placeInCart, removeId, removeWishlist, reset } from "./book.actions";
import { inject } from "@angular/core";
import { selectCart } from "../cart/cart.selector";
import { error } from "../auth/auth.actions";
import { IBook } from "../../Model/Book";

// export interface IBook {
//     title: string,
//     description: string,
//     pages: number,
//     price: number,
//     category: string,
//     date: Date,
//     ISBN: number,
//     publisher: string,
//     keywords: string
  
// }

export interface IBookState{
    // book: IBook[] | null,
    books: IBook[]
    loading: boolean,
    // error: {message:string} | null,
    error: {message:string} | null,
    message: string | null,
    reviews: null,
    book: IBook | null,
    pageSize: number,
    active: number
    authorBooks: IBook[]
    ids:string[]
}

const initialState : IBookState = {
    books: [],
    loading: false,
    error: null,
    message: null,
    reviews: null,
    book: null,
    pageSize: 0,
    active: 0,
    authorBooks: [],
    ids: []
}

export const bookReducer = createReducer(
    initialState,

    // add book
    on(addBook, (state) => ({...state,loading:true,error:null})),
    on(addBookSuccess, (state,action) => {
        const authorBooks = state.authorBooks ? [...state?.authorBooks,action.books] : [action.books];
        // console.log({authorBooks});
        
        return ({...state,loading:false,authorBooks})
    }),

    // get books
    on(getBooks, (state) => ({...state,loading:true,error:null})),
    on(getBooksSuccess, (state,action) => {
        console.log(action.books);
        return {...state,loading:false,books:action.books,pageSize:action.pageSize}
    }),

    // get books
    on(getAuthorBooks, (state) => ({...state,loading:true,error:null})),
    on(getAuthorBooksSuccess, (state,action) => {
        console.log(action.authorBooks,"reducer");
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
        const authorBooks = state.authorBooks?.map((book:IBook) => book._id == action.id ? action.book : book)
        return {...state,loading:false,authorBooks}
    }),

    // delete book
    on(deleteBook, (state) => ({...state,loading:true,error:null})),
    on(deleteBookSuccess, (state,action) => {
        const authorBooks = state.authorBooks?.filter((book:IBook) => book._id !== action.id)
        return {...state,loading:false,authorBooks}
    }),

    // place in cart
    on(placeInCart,(state) => {
        console.log("placing in cart");
        return {...state,book: state.book ? {...state.book,inCart:true} : null}
    }),


    // id array
    on(addId,(state,{id}) => {
        return {...state,ids:[...state.ids,id]};
    }),
   
    on(removeId,(state,{id}) => {
        const ids = state.ids.filter(i => i !== id)
        return {...state,ids}
    }),


    // add to wishlist
    on(addWishlist,(state,{id}) => {
        const books: IBook[] = state.books?.map((book: IBook) => {
            return book._id == id ? {...book,inWishlist:true} : book
        });
        // console.log({books});
        
        return {...state,books}
    }),

    // remove from wishlist
    on(removeWishlist,(state,{id}) => {
        const books = state.books.map((book: IBook) => book._id == id ? {...book,inWishlist:false} : book);
        // console.log({books});
        return {...state,books}
    }),

    on(reset, (state) => (initialState)),


    // error
    on(bookFailure, (state,action) => {
       return {...state,loading:false,error: {message:action.error.message}}
    }),
    on(hideError, (state) => {
        console.log("hii");
        
       return {...state,error: {message:"hi"}}
    })

)