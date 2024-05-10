import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { VerifyComponent } from '../../shared/verify/verify.component';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
  // otpPage! : string;

  ngOnInit(){
    this.paramObs = this.route.queryParamMap.subscribe(params => {
      this.email = params.get('email');
      this.forgotPassword = params.get('forgot-password');
    });
  }

  ngOnDestroy(): void {
    this.paramObs.unsubscribe()
  }
}
