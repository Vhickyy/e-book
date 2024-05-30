import { Component, OnInit, inject } from '@angular/core';
import { VerifyComponent } from '../../shared/verify/verify.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { verifyPayment } from '../../store/cart/cart.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-payment',
  standalone: true,
  imports: [VerifyComponent,RouterLink],
  templateUrl: './verify-payment.component.html',
  styleUrl: './verify-payment.component.css'
})
export class VerifyPaymentComponent implements OnInit {

  store = inject(Store)
  activatedRoute = inject(ActivatedRoute);
  paramObs!: Subscription;

  ngOnInit(){
    this.paramObs = this.activatedRoute.queryParamMap.subscribe(params => {
      const reference = params.get('reference');
      this.store.dispatch(verifyPayment({reference}));
    });
  }

}
