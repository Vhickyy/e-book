import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { DashboardLayoutComponent } from '../../shared/dashboard-layout/dashboard-layout.component';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { addId, getWishlist, removeWishlist } from '../../store/cart/cart.actions';
import { selectBookIds, selectWishlist, seletCartLoading } from '../../store/cart/cart.selector';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,DashboardLayoutComponent, CommonModule,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  wishList = [
    {
      img: '../../../assets/bookdet.png',
      title: "Intergalactic War of The Tidal",
      author: "Mark Zugerbeck",
      price: 3400
    },
    {
      img: '../../../assets/bookdet.png',
      title: "Intergalactic War of The Tidal",
      author: "Mark Zugerbeck",
      price: 3400
    },
    {
      img: '../../../assets/bookdet.png',
      title: "Intergalactic War of The Tidal",
      author: "Mark Zugerbeck",
      price: 3400
    },
    {
      img: '../../../assets/bookdet.png',
      title: "Intergalactic War of The Tidal",
      author: "Mark Zugerbeck",
      price: 3400
    },
  ]
  store = inject(Store)
  wishList$ = this.store.select(selectWishlist);
  ids$ = this.store.select(selectBookIds);
  loading$ = this.store.select(seletCartLoading);

  ngOnInit(): void {
    this.store.dispatch(getWishlist());
  }

  removeWishlist(id:string){
    this.store.dispatch(addId({id}));
    this.store.dispatch(removeWishlist({id}));
  }
}
