import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { VerifyComponent } from '../../shared/verify/verify.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { resetPassword } from '../../store/auth/auth.actions';
import { ActivatedRoute } from '@angular/router';
import { selectError, selectLoading } from '../../store/auth/auth.selector';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [VerifyComponent,FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent{
  newPassword: string = '';
  confirmPassword: string = '';
  store = inject(Store);
  email!: string | null;
  route = inject(ActivatedRoute);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  token :string | null = null;
  paramOb!: Subscription


  resetPasswordSubmit(formData:NgForm){
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get("token")
    })
    this.store.dispatch(resetPassword({newPassword:formData.value.newPassword,confirmPassword:formData.value.confirmPassword,token:this.token}))
  }

}
