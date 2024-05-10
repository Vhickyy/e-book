import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { DashboardLayoutComponent } from '../../shared/dashboard-layout/dashboard-layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,DashboardLayoutComponent, CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
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
}
