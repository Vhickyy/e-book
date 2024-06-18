import { createAction, props } from "@ngrx/store";
import { IUser } from "../../Model/User";

// register
export const registerUser = createAction('[Auth] registerUser',props<{user: {email: string,password:string,fullname:string,profile:string,phonenumber:string}}>())
export const registerSuccess = createAction('[Auth] registerSuccess',props<{user: IUser}>())


// verify-otp
export const verifyOtp = createAction('[Auth] verifyOtp',props<{code: number,email:string | null}>());
export const verifyOtpSuccess =  createAction('[Auth] verifyOtpSuccess',props<{data:string}>())


// resend-otp
export const resendOtp = createAction('[Auth] resendOtp',props<{email:string | null,forgotPassword?:string | null}>());
export const resendOtpSuccess =  createAction('[Auth] resendOtpSuccess',props<{data:string}>())


// login
export const loginUser = createAction('[Auth] loginUser',props<{user: {email: string,password:string}}>())
export const loginSuccess = createAction('[Auth] loginSuccess',props<{user: IUser}>())


// forgot password
export const forgotPasswordOtp = createAction('[Auth] forgotPasswordtp',props<{email:string}>());
export const forgotPasswordOtpSuccess =  createAction('[Auth] forgotPasswordtpSuccess',props<{data:string}>())


// verify forgot password otp
export const verifyForgotPasswordOtp = createAction('[Auth] verifyForgotPasswordtp',props<{code: number,email:string | null}>());
export const verifyForgotPasswordOtpSuccess =  createAction('[Auth] verifyForgotPasswordtpSuccess',props<{data:string}>())


// verify forgot password otp
export const resetPassword = createAction('[Auth] resetPassword',props<{newPassword: string,email:string | null,confirmPassword:string}>());
export const resetPasswordSuccess =  createAction('[Auth] resetPasswordSuccess',props<{data:string}>());
export const error = createAction('[Auth] registerFailure',props<{error : {message:string}}>());


// user
export const getUser = createAction('[Auth] getUser');
export const getUserSuccess = createAction('[Auth] getUserSuccess', props<{user:any}>());
