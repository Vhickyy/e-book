import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions,  createEffect, ofType } from "@ngrx/effects";
import * as bookAction from "../book/book.actions"
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { BookService } from "../../services/book.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { selectCart } from "../cart/cart.selector";
import { error } from "../auth/auth.actions";


export const addBookEffect = createEffect((actions$ = inject(Actions),bookService = inject(BookService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(bookAction.addBook),
        switchMap(({book})=>{
            return bookService.addBook(book).pipe(
                map((data: any)=>{
                    console.log(data);
                    router.navigate(["/books"])
                    return bookAction.addBookSuccess({books:data.data})
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    return of(bookAction.bookFailure({error:{message:error.error || error.statusText}}))
                })
            )
        })
    )
},{functional:true});


export const getAllBookEffect = createEffect((actions$ = inject(Actions), bookService = inject(BookService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(bookAction.getBooks),
        switchMap(({category,search,page}) => {
            return bookService.getAllBook(category,search,page).pipe(
                map(({data}:any)=>{
                    // console.log(data.pageSize);
                    return bookAction.getBooksSuccess({books:data.books,pageSize:data.pageSize})
                }),
                catchError((error:HttpErrorResponse) => {
                    // if(!error.error && error.status == 500){
                    //     console.log(error.statusText);
                    //     return of(bookAction.bookFailure({error:{message:"Check Your Internet Connectivity."}}))
                    // }
                    // // console.log("ji");
                    
                    // return of(bookAction.bookFailure(error))
                    console.log(error);
                    
                    return of(bookAction.bookFailure({error:{message:error.error || error.statusText}}))
                })
            )
        })
    )
},{functional:true})

export const getAuthorBookEffect = createEffect((actions$ = inject(Actions), bookService = inject(BookService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(bookAction.getAuthorBooks),
        switchMap(({authorId}) => {
            return bookService.getAuthorBooks(authorId).pipe(
                map(({data}:any)=>{
                    // console.log(data.pageSize);
                    console.log(data.books,{data});
                    
                    return bookAction.getAuthorBooksSuccess({authorBooks:data.books})
                }),
                catchError((error:HttpErrorResponse) => {
                    console.log(error);
                    return of(bookAction.bookFailure({error:{message:error.error || error.statusText}}))
                })
            )
        })
    )
},{functional:true})


export const getBookEffect = createEffect((actions$ = inject(Actions), bookService = inject(BookService), router = inject(Router), store = inject(Store)) => {
    return actions$.pipe(
        ofType(bookAction.getBook),
        switchMap(({id}:{id:string | null}) => {
            return bookService.getBook(id).pipe(
                map((data:any)=>{
                    console.log("single");
                    console.log({data});
                    return bookAction.getBookSuccess({book:data.data})
                }),
                catchError((error:HttpErrorResponse) => {
                    router.navigate(["/not-found"])
                    return of(bookAction.bookFailure({error:{message:error.error || error.statusText}}))
                })
            )
        })
    )
},{functional:true})


export const editBookEffect = createEffect((actions$ = inject(Actions),bookService = inject(BookService), router = inject(Router)) => {
    return actions$.pipe(
        ofType(bookAction.editBook),
        switchMap(({id,book})=>{
            return bookService.updateBook(id,book).pipe(
                map((data: any)=>{
                    console.log(data);
                    router.navigate(["/"])
                    return bookAction.editBookSuccess({message:data.message,id,book:data.book})
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    return of(bookAction.bookFailure({error:{message:error.error || error.statusText}}))
                })
            )
        })
    )
},{functional:true});


export const deleteBookEffect = createEffect((actions$ = inject(Actions),bookService = inject(BookService), store = inject(Store), router = inject(Router)) => {
    return actions$.pipe(
        ofType(bookAction.deleteBook),
        switchMap(({id})=>{
            return bookService.deleteBook(id).pipe(
                map((data: any)=>{
                    store.dispatch(bookAction.removeId({id}))
                    return bookAction.deleteBookSuccess({message:data.message,id})
                }),
                catchError((error:HttpErrorResponse)=> {
                    console.log(error);
                    store.dispatch(bookAction.removeId({id}))
                    return of(bookAction.bookFailure({error:{message:error.error || error.statusText}}))
                })
            )
        })
    )
},{functional:true});


export const postReviewEffect = createEffect((actions$ = inject(Actions), bookService = inject(BookService), store = inject(Store)) => {
    return actions$.pipe(
        ofType(bookAction.postReview),
        switchMap((data) => {
            return bookService.postReview(data).pipe(
                map(data => {
                    console.log(data);
                    return bookAction.postReviewSuccess({message:"hi"})
                }),
                catchError((error:HttpErrorResponse) => {
                    console.log({error});
                    return of(bookAction.bookFailure({error:{message:error.error || error.statusText}}))
                })
            )
        })
    )
},{functional:true})



export const getReviewsEffect = createEffect((actions$ = inject(Actions), bookService = inject(BookService), store = inject(Store)) => {
    return actions$.pipe(
        ofType(bookAction.getReviews),
        switchMap(({id}) => {
            return bookService.getReviews(id).pipe(
                map(data => {
                    console.log({data});
                    
                    return bookAction.getReviewsSuccess({reviews:["hi","hmm"]})
                }),
                catchError((error:HttpErrorResponse) => {
                    console.log({error});
                    return of(bookAction.bookFailure({error:{message:error.error || error.statusText}}))
                })
            )
        })
    )
},{functional:true})
