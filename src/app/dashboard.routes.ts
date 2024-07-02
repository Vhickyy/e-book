import { Routes } from '@angular/router';
import { AuthorEditComponent } from './pages/author-edit/author-edit.component';
import { SendMessageComponent } from './pages/send-message/send-message.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { LibraryComponent } from './pages/library/library.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { VerifyPaymentComponent } from './pages/verify-payment/verify-payment.component';
import { authorGuard } from './gaurds/author.guard';
import { OrdersComponent } from './pages/orders/orders.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { ReadingComponent } from './pages/reading/reading.component';


export const routes: Routes = [
    {path:"add-book", canActivate:[authorGuard],component:AddBookComponent},
    {path:"edit-book/:id", component:EditBookComponent},
    {path:"author/edit-profile/:id",canActivate:[authorGuard],component:AuthorEditComponent},
    {path:"author/send-message",component:SendMessageComponent},
    {path:"profile",component:ProfileComponent},
    {path:"wishlist",component:WishlistComponent},
    {path:"orders",component:OrdersComponent},
    {path:"library",component:LibraryComponent},
    {path:"library/:id",component:ReadingComponent},
    {path:"payment",component:PaymentComponent},
    {path:"verify-payment",component:VerifyPaymentComponent}
];
