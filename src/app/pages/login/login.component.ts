import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectError, selectLoading } from '../../store/auth/auth.selector';
import { CommonModule } from '@angular/common';
import { error, loginUser } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent,NavbarComponent,FormsModule,RouterLink,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  store = inject(Store);
  loading$ = this.store.select(selectLoading)
  error$ = this.store.select(selectError)
  http :HttpClient = inject(HttpClient);
  // router:Router = inject(Router);


  login (data: NgForm) {
    console.log(data.value);
    const {email,password} = data.value;
    if(!email || !password){
      this.store.dispatch(error({error:{message:"Provide all fields."}}));
      return
    }
    this.store.dispatch(loginUser({user:data.value}))
  }
}
