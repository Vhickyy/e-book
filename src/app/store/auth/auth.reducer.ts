import { createReducer, on } from "@ngrx/store";
import { forgotPasswordOtp, forgotPasswordOtpSuccess,  loginSuccess, loginUser, registerSuccess, registerUser, resendOtp,  resendOtpSuccess, verifyOtp, verifyOtpSuccess,  error, getUser, getUserSuccess, getCode, getCodeSuccess, getForgotPasswordCode, getForgotPasswordCodeSuccess, resetPassword, resetPasswordSuccess, logoutUser, logoutSuccess } from "./auth.actions";
import { IUser } from "../../Model/User";

export interface IAuthState {
    loading: boolean,
    error: {message:string} | null,
    user: IUser | null
    data: {code:number, token:string} | null
}

const initialState : IAuthState = {
    loading: false,
    error: null,
    user: null,
    data: null
}

export const authReducer = createReducer(
    initialState,

    // register
    on(registerUser, (state) => ({...state, loading:true,error:null})),
    on(registerSuccess, (state,action) => ({...state,loading:false})),
    on(error, (state,action) => {
        console.log(action.error);
        return {...state,loading:false,error: {message:action.error.message}}
        // return {...state,loading:false,error:action.error?.message}
    }),


    // verify-otp
    on(verifyOtp, (state)=> ({...state,loading:true,error:null})),
    on(verifyOtpSuccess, (state)=> ({...state,loading:false,error:null})),
    // on(error, (state,action)=> ({...state,loading:false,error:action.error})),


    // resend-otp
    on(resendOtp, (state)=> ({...state,loading:true,error:null})),
    on(resendOtpSuccess, (state,{data})=> {
       return ({...state,loading:false,error:null,data:data})
    }),
    // on(resendOtpFailure, (state,action)=> ({...state,loading:false,error:action.error})),


    // login
    on(loginUser, (state) => ({...state, loading:true,error:null})),
    on(loginSuccess, (state,action) => {
        console.log(action.user);
        return ({...state,loading:false,user:action.user})
    }),
    // on(loginFailure, (state,action) => ({...state,loading:false,error:action.error,user:null})),


    //logout
    on(logoutUser,(state) => ({...state, loading:true,error:null})),
    on(logoutSuccess,(state) => (initialState)),

    // forgot password
    on(forgotPasswordOtp, (state)=> ({...state,loading:true,error:null})),
    on(forgotPasswordOtpSuccess, (state)=> ({...state,loading:false,error:null})),
    // on(forgotPasswordOtpFailure, (state,action)=> ({...state,loading:false,error:action.error})),


    // reset password
    on(resetPassword, (state)=> ({...state,loading:true,error:null})),
    on(resetPasswordSuccess, (state)=> ({...state,loading:false,error:null})),


    // user
    on(getUser, (state)=> ({...state,loading:true,error:null})),
    on(getUserSuccess, (state,{user})=> {
        console.log({user},'red');
        return {...state,loading:false,user}
    }),


    // ============== Dummy mail assistance ============== //
    on(getCode, (state)=> ({...state,loading:true,error:null})),
    on(getCodeSuccess, (state,{data})=> {
        return {...state,loading:false,data}
    }),

    on(getForgotPasswordCode, (state)=> ({...state,loading:true,error:null})),
    on(getForgotPasswordCodeSuccess, (state,{data})=> {
        return {...state,loading:false,data}
    }),

)