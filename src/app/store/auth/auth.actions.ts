import { createAction, props } from "@ngrx/store";
import { IUser } from "../../Model/User";

// register
export const registerUser = createAction('[Auth] registerUser',props<{user: FormData}>())
export const registerSuccess = createAction('[Auth] registerSuccess',props<{user: IUser}>())


// verify-otp
export const verifyOtp = createAction('[Auth] verifyOtp',props<{code: number,token:string}>());
export const verifyOtpSuccess =  createAction('[Auth] verifyOtpSuccess',props<{data:string}>())


// resend-otp
export const resendOtp = createAction('[Auth] resendOtp',props<{email:string | null}>());
export const resendOtpSuccess =  createAction('[Auth] resendOtpSuccess',props<{data:{code:number,token:string}}>())


// login
export const loginUser = createAction('[Auth] loginUser',props<{user: {email: string,password:string}}>())
export const loginSuccess = createAction('[Auth] loginSuccess',props<{user: IUser}>())

// logout
export const logoutUser = createAction('[Auth] logoutUser')
export const logoutSuccess = createAction('[Auth] logoutSuccess')


// forgot password
export const forgotPasswordOtp = createAction('[Auth] forgotPasswordtp',props<{email:string}>());
export const forgotPasswordOtpSuccess =  createAction('[Auth] forgotPasswordtpSuccess')



// verify forgot password otp
export const resetPassword = createAction('[Auth] resetPassword',props<{newPassword: string,token:string | null,confirmPassword:string}>());
export const resetPasswordSuccess =  createAction('[Auth] resetPasswordSuccess',props<{data:string}>());
export const error = createAction('[Auth] registerFailure',props<{error : {message:string}}>());


// user
export const getUser = createAction('[Auth] getUser');
export const getUserSuccess = createAction('[Auth] getUserSuccess', props<{user:IUser}>());

// Author
export const getAuthor = createAction('[Auth] getAuthor',props<{id:string}>());
export const getAuthorSuccess = createAction('[Auth] getAuthorSuccess', props<{user:IUser}>());

export const becomeAuthor = createAction('[Auth] becomeAuthor',props<{authorData:any}>());
export const becomeAuthorSuccess = createAction('[Auth] becomeAuthorSuccess', props<{user:IUser}>());


export const getCode = createAction('[Auth] getCode',props<{email:string}>());
export const getCodeSuccess = createAction('[Auth] getCodeSuccess', props<{data:{code:number, token:string}}>());

export const getForgotPasswordCode = createAction('[Auth] getForgotPasswordCode',props<{email:string}>());
export const getForgotPasswordCodeSuccess = createAction('[Auth] getForgotPasswordCodeSuccess', props<{data:{code:number, token:string}}>());
