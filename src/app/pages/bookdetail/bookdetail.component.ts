import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBook } from '../../store/book/book.actions';
import { Subscription } from 'rxjs';
import { selectBook } from '../../store/book/book.selector';
import { addAnnonymousCart, addCart } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-bookdetail',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FooterComponent,RouterLink],
  templateUrl: './bookdetail.component.html',
  styleUrl: './bookdetail.component.css'
})
export class BookdetailComponent implements OnInit {

  store = inject(Store);
  activatedRoute = inject(ActivatedRoute);
  paramObs!: Subscription;
  book$ = this.store.select(selectBook);
  id! :string | null;
  token = localStorage.getItem("token");
  // incart$ = this.store.select(selectIncart);

  ngOnInit(): void {
    console.log("loadind");
    this.paramObs = this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.store.dispatch(getBook({id:this.id}));
      // this.book$ = this.store.select(selectBook);
    });
  }

  addToCart(){
    // console.log(this.inCart);
    if(this.token){
      return this.store.dispatch(addCart({id:this.id}));
    }
    return this.store.dispatch(addAnnonymousCart({id:this.id}));
  }

  ngOnDestroy(): void {
    this.paramObs.unsubscribe();
    // this.cartO$.unsubscribe();
  }
}
