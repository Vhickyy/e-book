import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { DashboardLayoutComponent } from '../../shared/dashboard-layout/dashboard-layout.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { getWishlist, removeWishlist } from '../../store/cart/cart.actions';
import { selectWishlist } from '../../store/cart/cart.selector';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,DashboardLayoutComponent, CommonModule],
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

  ngOnInit(): void {
    this.store.dispatch(getWishlist());
  }

  removeWishlist(id:string){
    this.store.dispatch(removeWishlist({id}))
  }
}
