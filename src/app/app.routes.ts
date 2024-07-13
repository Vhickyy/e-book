import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { BookdetailComponent } from './pages/bookdetail/bookdetail.component';
import { AuthorComponent } from './pages/author/author.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { VerifySuccessComponent } from './pages/verify-success/verify-success.component';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { authGaurd } from './gaurds/auth-gaurd.guard';
import { openauthGuard } from './gaurds/openauth.guard';
// import { BecomeAuthorComponent } from './pages/become-author/become-author.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


export const routes: Routes = [
    {path: "", component:HomeComponent},
    {path: "about", component:AboutComponent},
    {path: "",canActivate:[openauthGuard], children:[
        {path: "login", component:LoginComponent},
        {path: "register", component:RegisterComponent},
        {path:"verify-email",component:VerifyEmailComponent},
        {path:"verify-otp",component:VerifyOtpComponent},
        {path:"forgot-password",component:ForgotPasswordComponent},
        {path:"reset-password",component:ResetPasswordComponent},
        {path:"verify-success",component:VerifySuccessComponent},
    ]},
    {path:"books", component:BooksComponent},
    {path:"books/:category/:id",component:BookdetailComponent},
    {path:"contact",component:ContactComponent},
    {path:"faq",component:FaqComponent},
    {path:"author/:name/:id",component:AuthorComponent},
    {path:"cart",component:CartComponent},
    {path:'dashboard',canActivate:[authGaurd],loadChildren:()=> import('./dashboard.routes').then((m) => m.routes)},
    {path:"**",component:NotFoundComponent}
];
