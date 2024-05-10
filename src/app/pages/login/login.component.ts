import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoading } from '../../store/auth/auth.selector';
import { CommonModule } from '@angular/common';
import { loginUser } from '../../store/auth/auth.actions';

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
  http :HttpClient = inject(HttpClient);
  // router:Router = inject(Router);


  login (data: NgForm) {
    console.log(data.value);
    // this.http.post("/api/v1/auth/login", data.value).subscribe({
    //   next: (data:any)=>{
    //     console.log(data);
    //     localStorage.setItem("token",JSON.stringify(data.data.token))
    //     this.router.navigate(["/dashboard/profile"])
    //   }
    // })
    this.store.dispatch(loginUser({user:data.value}))
  }
}
