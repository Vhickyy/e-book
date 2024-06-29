import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { VerifyComponent } from '../../shared/verify/verify.component';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { getCode, getForgotPasswordCode } from '../../store/auth/auth.actions';
import { selectError, selectLoading, selectToken } from '../../store/auth/auth.selector';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [VerifyComponent,CommonModule,RouterLink],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  store = inject(Store);
  route = inject(ActivatedRoute);
  email!: string | null;
  paramObs!: Subscription;
  forgotPassword! : string | null;
  http = inject(HttpClient)
  token$= this.store.select(selectToken)
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError)

 

  ngOnInit(){

    this.paramObs = this.route.queryParamMap.subscribe(params => {
      this.email = params.get('email');
      this.forgotPassword = params.get('forgot-password');
    });

    if(this.email){
      !this.forgotPassword ? this.store.dispatch(getCode({email:this.email})) :  this.store.dispatch(getForgotPasswordCode({email:this.email}))
    }

  }

  ngOnDestroy(): void {
    this.paramObs.unsubscribe()
  }
}
