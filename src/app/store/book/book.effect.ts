import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions,  createEffect, ofType } from "@ngrx/effects";
import * as bookAction from "../book/book.actions"
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { BookService } from "../../services/book.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { selectCart } from "../cart/cart.selector";


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
                    return of(bookAction.bookFailure(error));
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
                    console.log(error);
                    return of(bookAction.bookFailure(error))
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
                    console.log(data,id);
                    let inCart;
                    // store.select(selectCart).subscribe(data => {
                    //     // console.log(data,"bookdata");  
                    //     if(!data || !data.items) {
                    //         inCart = false;
                    //         return
                    //     };
                    //     const cart = data.items.find((item: any) => {
                    //         return item._id == id || item == id
                    //         // return item == id 
                    //     });
                    //     // console.log(cart);
                        
                    //     if(cart){
                    //         inCart = true;
                    //         return
                    //     }
                    //     inCart = false;
                    // });
                    // console.log(inCart,data.data);
                    
                    return bookAction.getBookSuccess({book:data.data})
                }),
                catchError((error:HttpErrorResponse) => {
                    return of(bookAction.bookFailure(error))
                })
            )
        })
    )
},{functional:true})

// export const getAllBookEffect = createEffect((actions$ = inject(Actions), bookService = inject(BookService), router = inject(Router), store = inject(Store)) => {
//     return actions$.pipe(
//         ofType(bookAction.getBooks),
//         switchMap(() => {
//             return bookService.getAllBook().pipe(
//                 map((data:any)=>{
//                     console.log(data.data);
//                     return bookAction.getBooksSuccess({books:data.data.books})
//                 }),
//                 catchError((error:HttpErrorResponse) => {
//                     console.log(error);
//                     return of(bookAction.bookFailure(error))
//                 })
//             )
//         })
//     )
// },{functional:true})


// export const getBookEffect = createEffect((actions$ = inject(Actions), bookService = inject(BookService), router = inject(Router), store = inject(Store)) => {
//     return actions$.pipe(
//         ofType(bookAction.getBook),
//         switchMap(({id}:{id:string | null}) => {
//             withLatestFrom(store.pipe(select(selectCart))),
//             return bookService.getBook(id).pipe(
//                 map((data:any)=>{
//                     console.log(data);
//                     let cart;
//                     store.select(selectCart).subscribe(data => {
//                         cart = data
//                     });
//                     // cart.subscribe()
//                     console.log(cart);
                    
//                     return bookAction.getBookSuccess({book:data.data})
//                 }),
//                 catchError((error:HttpErrorResponse) => {
//                     return of(bookAction.bookFailure(error))
//                 })
//             )
//         })
//     )
// },{functional:true})