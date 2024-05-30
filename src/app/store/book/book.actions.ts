import { createAction, props } from "@ngrx/store";
import { IBook } from "./book.reducer";

// Add Book
export const addBook = createAction('[Book] addBook', props<{book: IBook}>());
export const addBookSuccess = createAction('[Book] addBookSuccess', props<{books: IBook[]}>());

// Get All Books
export const getBooks = createAction('[Book] getAllBooks',props<{category:string,search:string,page?:number}>());
export const getBooksSuccess = createAction('[Book] getAllBooksSuccess', props<{books: IBook[],pageSize:number}>());

// Get Book
export const getBook = createAction('[Book] getBook', props<{id:string | null}>());
export const getBookSuccess = createAction('[Book] getBookSuccess', props<{book: IBook}>());

// Edit Book
export const editBook = createAction('[Book] editBook', props<{id:string}>());
export const editBookSuccess = createAction('[Book] editBookSuccess', props<{message: string}>());

// Delete Book
export const deleteBook = createAction('[Book] deleteBook', props<{id:string}>());
export const deleteBookSuccess = createAction('[Book] deleteBookSuccess', props<{message: string}>());

// place in cart
export const placeInCart = createAction('[Book] placeInCart');

export const addWishlist = createAction('[Book] addWishlist',props<{id:string}>())
export const removeWishlist = createAction('[Book] removeWishlist',props<{id:string}>())

// Add Review

// error
export const bookFailure = createAction('[Book] bookFailure', props<{error: string}>());