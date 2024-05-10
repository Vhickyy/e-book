import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { getCart, removeAnnonymousCart, removeCart } from '../../store/cart/cart.actions';
import { selectCart } from '../../store/cart/cart.selector';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  // cartItems = [
  //   {
  //     img: '../../../assets/bookdet.png',
  //     title: "Intergalactic War of The Tidal",
  //     author: "Mark Zugerbeck",
  //     price: 3400
  //   }
  // ]
  store = inject(Store);
  cartItems$ = this.store.select(selectCart);
  token = localStorage.getItem("token");


  removeFromCart(id:string) {
    if(this.token){
      return this.store.dispatch(removeCart({id}));
    }
    return this.store.dispatch(removeAnnonymousCart({id}));
  }
}
