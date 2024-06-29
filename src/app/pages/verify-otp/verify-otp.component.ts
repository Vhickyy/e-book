import { Component, ElementRef, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren, inject } from '@angular/core';
import { VerifyComponent } from '../../shared/verify/verify.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getCode, resendOtp, verifyOtp } from '../../store/auth/auth.actions';
import { selectData, selectError, selectLoading, selectToken } from '../../store/auth/auth.selector';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { query } from '@angular/animations';

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
  route = inject(ActivatedRoute)
  router = inject(Router)
  count = 0
  intervalId:any;
  otp$ = this.store.select(selectData)
  token$ = this.store.select(selectToken);

  @ViewChildren('inputField') inputField!: QueryList<ElementRef>;

  ngOnInit(){
    this.paramObs = this.route.queryParamMap.subscribe(params => {
      this.email = params.get('email');
    })
    if(this.email){
      this.store.dispatch(getCode({email:this.email}))
    }
  };
  
  ngAfterViewInit() {
    this.inputField.first.nativeElement.focus()
  }

  trackByFn(index: Number) {
    return index;
  }

  // transfer logic to auth service
  onValueChange(e:any,index:number){
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
        let token
        this.token$.subscribe(data => {
          token = data;
        }) 
        if(token){
          this.store.dispatch(verifyOtp({code:Number(this.code.join('')),token}));
        }
      
      this.error$.subscribe(val=>{
        if(val){
          this.filled = false;
          this.code= ["","","","","",""];
        }
      })
    }
  }

  onBack(e:KeyboardEvent,index:number){
    if(e.key == 'Backspace'){
      this.code[index] = '';
      this.inputField.toArray()[index].nativeElement.value = '';
      if(index)this.inputField.toArray()[index - 1].nativeElement.focus();
    }
  }
 
  resendOtp(){
    if(this.intervalId) clearInterval(this.intervalId)
      this.store.dispatch(resendOtp({email:this.email}));
    let token
    this.token$.subscribe(data => {
      token = data
    }) 
    this.router.navigate(['/verify-otp'],{queryParams: {email:this.email,token}})
    this.count = 30
    this.intervalId = setInterval(()=>{
    if(this.count < 1) return
    this.count -= 1;
    },1000)
  }

}
