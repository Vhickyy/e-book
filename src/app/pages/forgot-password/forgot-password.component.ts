import { Component, inject } from '@angular/core';
import { VerifyComponent } from '../../shared/verify/verify.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { forgotPasswordOtp } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [VerifyComponent,FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  store = inject(Store)

  requestCode(form: NgForm){
    // console.log(form.value);
    this.store.dispatch(forgotPasswordOtp(form.value))
  }
}
