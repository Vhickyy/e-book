import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { BookcategoryComponent } from './pages/bookcategory/bookcategory.component';
import { BookdetailComponent } from './pages/bookdetail/bookdetail.component';
import { AuthorComponent } from './pages/author/author.component';
import { AuthorEditComponent } from './pages/author-edit/author-edit.component';
import { SendMessageComponent } from './pages/send-message/send-message.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { VerifySuccessComponent } from './pages/verify-success/verify-success.component';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

export const routes: Routes = [
    {path: "", component:HomeComponent},
    {path: "about", component:AboutComponent},
    {path: "login", component:LoginComponent},
    {path: "register", component:RegisterComponent},
    {path:"verify-email",component:VerifyEmailComponent},
    {path:"verify-otp",component:VerifyOtpComponent},
    {path:"forgot-password",component:ForgotPasswordComponent},
    {path:"reset-password",component:ResetPasswordComponent},
    {path:"verify-success",component:VerifySuccessComponent},
    {path:"books", component:BooksComponent},
    // {path:"books/:category",component:BookcategoryComponent},
    {path:"books/:category/:id",component:BookdetailComponent},
    {path:"contact",component:ContactComponent},
    {path:"faq",component:FaqComponent},
    {path:"author",component:AuthorComponent},
    {path:"cart",component:CartComponent},
    {path:'dashboard',children:[
        {path:"add-book", component:AddBookComponent},
        {path:"author/edit-profile",component:AuthorEditComponent},
        {path:"author/send-message",component:SendMessageComponent},
        {path:"profile",component:ProfileComponent},
        {path:"wishlist",component:WishlistComponent},
    ]}
];
