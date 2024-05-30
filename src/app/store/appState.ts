import { IAuthState } from "./auth/auth.reducer";
import { IBookState } from "./book/book.reducer";

export interface AppState {
    auth: IAuthState,
    book: IBookState,
    cart: any,
    library: any
}