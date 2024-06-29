import { createReducer, on } from "@ngrx/store"
import { getLibrary, getLibrarySuccess, getPdf, getPdfSuccess, libraryError, reset } from "./library.actions"

interface ILibrary  {
    loading: boolean
    library: any,
    recentlyOpened: any,
    error : string | null,
    message?: string | null
    cartLength: number
    pdf: any
}

const initialState: ILibrary = {
    loading: false,
    cartLength: 0,
    library: [],
    recentlyOpened: [],
    error: null,
    message: null,
    pdf: null
}


export const libraryReducer = createReducer(
    initialState,

    // ------------------------ Get Library -------------------- //
    on(getLibrary,(state) => ({...state,loading:true,error:null})),
    on(getLibrarySuccess,(state,{library,recentlyOpened}) => {
        return ({...state,loading:false,library,recentlyOpened})
    }),


    // --------------------------- Get Pdf ------------------------ //
    on(getPdf,(state) => ({...state,loading:true,error:null})),
    on(getPdfSuccess,(state,{book}) => {
        return ({...state,loading:false,pdf:book})
    }),

    on(libraryError,(state,action)=> ({...state,loading:false,error:action.error})),

    on(reset, (state) => (initialState)),
)