import { createReducer, on } from "@ngrx/store"
import { getLibrary, getLibrarySuccess, libraryError } from "./library.actions"

interface ILibrary  {
    loading: boolean
    library: any,
    recentlyOpened: any,
    error : string | null,
    message?: string | null
    cartLength: number
}

const initialState: ILibrary = {
    loading: false,
    cartLength: 0,
    library: [],
    recentlyOpened: [],
    error: null,
    message: null
}


export const libraryReducer = createReducer(
    initialState,

    // Get Library
    on(getLibrary,(state) => ({...state,loading:true,error:null})),
    on(getLibrarySuccess,(state,{library,recentlyOpened}) => {
        return ({...state,library,recentlyOpened})
    }),

    on(libraryError,(state,action)=> ({...state,loading:false,error:action.error})),
)