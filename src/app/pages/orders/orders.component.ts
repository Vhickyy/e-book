import { Component, OnInit, inject } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { DashboardLayoutComponent } from '../../shared/dashboard-layout/dashboard-layout.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { getOrders } from '../../store/cart/cart.actions';
import { Store } from '@ngrx/store';
import { selectOrders } from '../../store/cart/cart.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [FooterComponent,DashboardLayoutComponent,NavbarComponent,CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  store = inject(Store);
  orders$ = this.store.select(selectOrders)

  ngOnInit(){
    this.store.dispatch(getOrders());
  }
}
