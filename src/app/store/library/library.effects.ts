import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as libraryAction from  "./library.actions"
import { catchError, map, of, switchMap } from "rxjs";
import { LibraryService } from "../../services/library.service";
import { HttpErrorResponse } from "@angular/common/http";


export const getLibrary = createEffect((action$=inject(Actions), libraryService = inject(LibraryService)) => {
    return action$.pipe(
        ofType(libraryAction.getLibrary),
        switchMap(() => {
            return libraryService.getLibrary().pipe(
                map(({data}) => {
                    console.log(data.library);   
                    return libraryAction.getLibrarySuccess({library:data.library,recentlyOpened:data.recentlyOpened})
                }),
                catchError((error:HttpErrorResponse) => of(libraryAction.libraryError(error)))
            )
        })
    )
},{functional:true})
