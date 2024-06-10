import { createAction, props } from "@ngrx/store";
import { IBook } from "./book.reducer";

// Add Book
export const addBook = createAction('[Book] addBook', props<{book: FormData}>());
export const addBookSuccess = createAction('[Book] addBookSuccess', props<{books: IBook[]}>());

// Get All Books
export const getBooks = createAction('[Book] getAllBooks',props<{category:string,search:string,page?:number}>());
export const getBooksSuccess = createAction('[Book] getAllBooksSuccess', props<{books: IBook[],pageSize:number}>());

// Get All Author Books
export const getAuthorBooks = createAction('[Book] getAuthorAllBooks',props<{authorId:string | null}>());
export const getAuthorBooksSuccess = createAction('[Book] getAuthorAllBooksSuccess', props<{authorBooks: IBook[]}>());

// Get Book
export const getBook = createAction('[Book] getBook', props<{id:string | null}>());
export const getBookSuccess = createAction('[Book] getBookSuccess', props<{book: IBook}>());

// Edit Book
export const editBook = createAction('[Book] editBook', props<{id:string | null,book:any}>());
export const editBookSuccess = createAction('[Book] editBookSuccess', props<{message: string,id:string | null,book:IBook}>());

// Delete Book
export const deleteBook = createAction('[Book] deleteBook', props<{id:string}>());
export const deleteBookSuccess = createAction('[Book] deleteBookSuccess', props<{message: string,id:string}>());

// place in cart
export const placeInCart = createAction('[Book] placeInCart');

// id array
export const addId = createAction('[Book] addId',props<{id:string}>());
export const removeId = createAction('[Book] removeId',props<{id:string}>());


// wishlist
export const addWishlist = createAction('[Book] addWishlist',props<{id:string}>())
export const removeWishlist = createAction('[Book] removeWishlist',props<{id:string}>())

// Add Review

// error
export const bookFailure = createAction('[Book] bookFailure', props<{error: string}>());