import { createReducer, on } from "@ngrx/store";
import { forgotPasswordOtp, forgotPasswordOtpSuccess,  loginSuccess, loginUser, registerSuccess, registerUser, resendOtp,  resendOtpSuccess, verifyOtp, verifyOtpSuccess, verifyForgotPasswordOtp, verifyForgotPasswordOtpSuccess,  error, getUser, getUserSuccess } from "./auth.actions";
import { IUser } from "../../Model/User";

export interface IAuthState {
    loading: boolean,
    error: {message:string} | null,
    user: IUser | null
    data: string | null
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
    on(registerSuccess, (state,action) => ({...state,loading:false,user:action.user})),
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
    on(resendOtpSuccess, (state)=> ({...state,loading:false,error:null})),
    // on(resendOtpFailure, (state,action)=> ({...state,loading:false,error:action.error})),


    // login
    on(loginUser, (state) => ({...state, loading:true,error:null})),
    on(loginSuccess, (state,action) => {
        console.log(action.user);
        return ({...state,loading:false,user:action.user})
    }),
    // on(loginFailure, (state,action) => ({...state,loading:false,error:action.error,user:null})),


    // forgot password
    on(forgotPasswordOtp, (state)=> ({...state,loading:true,error:null})),
    on(forgotPasswordOtpSuccess, (state)=> ({...state,loading:false,error:null})),
    // on(forgotPasswordOtpFailure, (state,action)=> ({...state,loading:false,error:action.error})),


    // verify forgot password otp
    on(verifyForgotPasswordOtp, (state)=> ({...state,loading:true,error:null})),
    on(verifyForgotPasswordOtpSuccess, (state)=> ({...state,loading:false,error:null})),
    // on(verifyForgotPasswordOtpFailure, (state,action)=> ({...state,loading:false,error:action.error})),


    // reset password
    on(verifyForgotPasswordOtp, (state)=> ({...state,loading:true,error:null})),
    on(verifyForgotPasswordOtpSuccess, (state)=> ({...state,loading:false,error:null})),
    // on(verifyForgotPasswordOtpFailure, (state,action)=> ({...state,loading:false,error:action.error})),


    // user
    on(getUser, (state)=> ({...state,loading:true,error:null})),
    on(getUserSuccess, (state,{user})=> {
        console.log({user},'red');
        
        return {...state,loading:false,user}
    }),

)