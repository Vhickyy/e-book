import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Store } from '@ngrx/store';
import { orderBooks } from '../../store/cart/cart.actions';
import { selectCart } from '../../store/cart/cart.selector';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getBook } from '../../store/book/book.actions';
import { selectBook } from '../../store/book/book.selector';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,CommonModule,RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})


export class PaymentComponent {

  store = inject(Store);
  cartItems$ = this.store.select(selectCart);
  paramObs!: Subscription;
  route = inject(ActivatedRoute);
  // items$!: any;
  single!: string | null;
  item: any

  ngOnInit() {
    this.paramObs = this.route.queryParamMap.subscribe(data => {
      this.single = data.get('buy-now');
      const id = data.get('id');
      if(this.single){
        this.store.dispatch(getBook({id}));
        // this.items$ = this.store.select(selectBook);
        this.store.select(selectBook).subscribe(data => this.item = data);
        return
      }
      this.store.select(selectCart).subscribe(data => this.item = data);
      // this.items$ = this.store.select(selectCart);
    })
  }

  makePayment(id:string){
    console.log(id);
    
    console.log(this.item)
    if(this.single){
      return this.store.dispatch(orderBooks({id,single:true}));
    }
    return this.store.dispatch(orderBooks({id,single:false}));
    // if(!this.item.length){
    //   // return this.store.dispatch(orderBooks({id}));
    // }
    // this.cartItems$.subscribe(data=>{
    //   return this.store.dispatch(orderBooks({id:data._id}));
    // })
    // console.log("het");
  }

}
