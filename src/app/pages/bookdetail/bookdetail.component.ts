import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBook } from '../../store/book/book.actions';
import { Subscription } from 'rxjs';
import { selectBook, selectBookLoading } from '../../store/book/book.selector';
import { addAnnonymousCart, addCart } from '../../store/cart/cart.actions';
import { seletCartLoading } from '../../store/cart/cart.selector';
import { selectUser } from '../../store/auth/auth.selector';
import { ReviewComponent } from '../../components/review/review.component';

@Component({
  selector: 'app-bookdetail',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FooterComponent,RouterLink,ReviewComponent],
  templateUrl: './bookdetail.component.html',
  styleUrl: './bookdetail.component.css'
})
export class BookdetailComponent implements OnInit {

  store = inject(Store);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)
  paramObs!: Subscription;
  book$ = this.store.select(selectBook);
  id! :string | null;
  token = localStorage.getItem("token");
  loadingCart$ = this.store.select(seletCartLoading);
  loadingBook$ = this.store.select(selectBookLoading);
  user$ =this.store.select(selectUser);
  showReview = false;
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

  onCloseReview(){
    this.showReview = false
  }

  ngOnDestroy(): void {
    this.paramObs.unsubscribe();
    // this.cartO$.unsubscribe();
  }
}
