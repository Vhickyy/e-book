import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Store } from '@ngrx/store';
import { orderBooks } from '../../store/cart/cart.actions';
import { selectCart } from '../../store/cart/cart.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  store = inject(Store);
  cartItems$ = this.store.select(selectCart);

  makePayment(){
    this.cartItems$.subscribe(data=>{
      console.log(data);
      this.store.dispatch(orderBooks({id:data._id}));
    })
    console.log("het");
  }

}
