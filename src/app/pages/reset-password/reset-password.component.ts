import { Component, inject } from '@angular/core';
import { VerifyComponent } from '../../shared/verify/verify.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { resetPassword } from '../../store/auth/auth.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [VerifyComponent,FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  store = inject(Store);
  email!: string | null;
  route = inject(ActivatedRoute)


  resetPasswordSubmit(formData:NgForm){
    this.route.queryParamMap.subscribe(params => {
      this.email = params.get("email")
    })
    this.store.dispatch(resetPassword({newPassword:formData.value.newPassword,email:this.email}))
  }

}
