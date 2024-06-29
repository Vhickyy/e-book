import { Component } from '@angular/core';
import { VerifyComponent } from '../../shared/verify/verify.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-verify-success',
  standalone: true,
  imports: [VerifyComponent,RouterModule],
  templateUrl: './verify-success.component.html',
  styleUrl: './verify-success.component.css'
})
export class VerifySuccessComponent {

}
