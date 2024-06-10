import { HttpClientModule } from '@angular/common/http';
import { Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUser } from './store/auth/auth.actions';
import { getBooks } from './store/book/book.actions';
import { getAnnonymousCart, getCart } from './store/cart/cart.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'e-book';
  store = inject(Store);
  token = localStorage.getItem("token")

  ngOnInit () {
    this.store.dispatch(getUser());
    if(!this.token){
      console.log("app anno cart");
      return this.store.dispatch(getAnnonymousCart())
    }
    console.log("app cart");
    
    return this.store.dispatch(getCart())
  }
}
