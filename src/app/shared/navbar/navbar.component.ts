import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ILinks } from '../../../types/types';
import { linksData, linksDataMobile } from '../../../data/data';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoading, selectUser } from '../../store/auth/auth.selector';
import { getUser, logoutUser } from '../../store/auth/auth.actions';
import { getAnnonymousCart, getCart } from '../../store/cart/cart.actions';
import { selectCartLength } from '../../store/cart/cart.selector';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  links: ILinks[] = linksData;
  linksMobile: ILinks[] = linksDataMobile;
  store = inject(Store);
  user$ = this.store.select(selectUser);
  loading$ = this.store.select(selectLoading);
  token = localStorage.getItem("token") || "";
  cartLength$ = this.store.select(selectCartLength);
  show = false;
  // show = false;
  router = inject(Router)
  ngOnInit () {
    // this.store.dispatch(getUser());
    // if(!this.token){
    //   return this.store.dispatch(getAnnonymousCart())
    // }
    // return this.store.dispatch(getCart())
  }

  toggleShow(){
    this.show = !this.show
  }

  signOut(){
    // localStorage.removeItem("token");
    // this.router.navigate(['/login'])
    this.store.dispatch(logoutUser())
    if(this.show){
      this.show = false
    }
  }
}
