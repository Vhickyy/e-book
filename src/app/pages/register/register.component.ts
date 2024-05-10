import { Component, OnInit, inject} from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { PageoneComponent } from '../../components/pageone/pageone.component';
import { PagetwoComponent } from '../../components/pagetwo/pagetwo.component';
import { PagethreeComponent } from '../../components/pagethree/pagethree.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { registerUser } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,CommonModule,PageoneComponent,PagetwoComponent,PagethreeComponent,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  page: number = 1;
  fb = inject(FormBuilder);
  registerForm! : FormGroup;
  imageUrl: string | ArrayBuffer | null | undefined = null;
  store = inject(Store);

  ngOnInit(){
    this.registerForm = this.fb.group({
      fullname: new FormControl(''),
      email: [''],
      password: [''],
      phonenumber: [''],
      profile: [''],
      interest: this.fb.array([])
    })
  }
  
  changePage(){
    if(this.page < 3){
      this.page++
    }else{
      this.page =  1;
    }
  }

  register(){
    // console.log(this.registerForm.value);
    this.store.dispatch(registerUser({user:this.registerForm.value}))
  }

  image(img:string | ArrayBuffer | null | undefined){
    this.imageUrl = img;
  }
}
