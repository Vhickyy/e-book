import { createAction, props } from "@ngrx/store";

export const getLibrary = createAction('[Library] getLibrary');
export const getLibrarySuccess = createAction('[Library] getLibrarySuccess',props<{library:any,recentlyOpened:any}>());

export const getPdf = createAction('[Library] getPdf',props<{id:string | null}>());
export const getPdfSuccess = createAction('[Library] getPdfSuccess',props<{book:any}>());

export const libraryError = createAction('[Library] libraryError',props<{error:string}>());

export const reset = createAction('[Library] reset')