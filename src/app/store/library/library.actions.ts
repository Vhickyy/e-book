import { createAction, props } from "@ngrx/store";

export const getLibrary = createAction('[Library] getLibrary');
export const getLibrarySuccess = createAction('[Library] getLibrarySuccess',props<{library:any,recentlyOpened:any}>());

export const libraryError = createAction('[Library] libraryError',props<{error:string}>());