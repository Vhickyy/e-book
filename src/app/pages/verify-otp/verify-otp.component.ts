import { Component, ElementRef, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren, inject } from '@angular/core';
import { VerifyComponent } from '../../shared/verify/verify.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { resendOtp, verifyForgotPasswordOtp, verifyOtp } from '../../store/auth/auth.actions';
import { selectError, selectLoading } from '../../store/auth/auth.selector';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [VerifyComponent,CommonModule,FormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})

export class VerifyOtpComponent implements OnInit{
  code = ['','','','','',''];
  filled = false;
  store = inject(Store);
  loading$ = this.store.select(selectLoading)
  error$ = this.store.select(selectError)
  paramObs!: Subscription;
  email!: string | null;
  forgotPassword! : string | null;
  route = inject(ActivatedRoute)
  count = 0
  intervalId:any;

  @ViewChildren('inputField') inputField!: QueryList<ElementRef>;

  ngOnInit(){
    this.paramObs = this.route.queryParamMap.subscribe(params => {
    this.email = params.get('email');
    this.forgotPassword = params.get('forgot-password');
  })};

  ngAfterViewInit() {
    this.inputField.first.nativeElement.focus()
  }

  trackByFn(index: Number) {
    return index;
  }

  // transfer logic to auth service
  onValueChange(e:any,index:any){
    if(e && !this.filled){
      if(isNaN(Number(e))){
        this.inputField.toArray()[index].nativeElement.value = this.code[index];
        return
      }
      // if(!isNaN(Number(e))){
        this.code[index] = e[e.length - 1];
        this.filled = this.code.every(digit => digit);
        this.inputField.toArray()[index].nativeElement.value = this.code[index];
        if(index < this.code.length - 1)this.inputField.toArray()[index + 1].nativeElement.focus();
      // }
    }
    
    if(this.filled && e){
      if(this.forgotPassword){
        this.store.dispatch(verifyForgotPasswordOtp({code:Number(this.code.join('')),email:this.email}))
      }else{
        this.store.dispatch(verifyOtp({code:Number(this.code.join('')),email:this.email}));
      }
      
      this.error$.subscribe(val=>{
        if(val){
          this.filled = false;
          this.code= ["","","","","",""];
        }
      })
    }
  }

  onBack(e:KeyboardEvent,index:any){
    if(e.key == 'Backspace'){
      this.code[index] = '';
      this.inputField.toArray()[index].nativeElement.value = '';
      if(index)this.inputField.toArray()[index - 1].nativeElement.focus();
    }
  }
 
  resendOtp(){
    if(this.intervalId) clearInterval(this.intervalId)
    if(this.forgotPassword){
      this.store.dispatch(resendOtp({email:this.email,forgotPassword:this.forgotPassword}))
    }else{
      this.store.dispatch(resendOtp({email:this.email}));
    }
    this.count = 30
    this.intervalId = setInterval(()=>{
    if(this.count < 1) return
    this.count -= 1;
    },1000)
  }

}
