import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pagetwo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagetwo.component.html',
  styleUrl: './pagetwo.component.css'
})
export class PagetwoComponent {
  @Input() registerForm! :FormGroup;
  @Output()
  changePage: EventEmitter<any> = new EventEmitter<any>();
  list = ["Science","Finance","Tech","Health","Politics","Education","Art","Fashion","Love"]

  onChangePage(skip?:boolean){
    if(skip){
      this.registerForm.patchValue({
        interest: ''
      })
    }
    this.changePage.emit()
  }

  select(value:string){
    const interest = this.registerForm.get('interest')?.value || []
    
    if(interest.includes(value)){
      this.registerForm.patchValue({
        interest: interest.filter((item:string) => item !== value)
      })
    }else{
      interest.push(value)
      this.registerForm.patchValue({
        interest: interest
      })
    }
  }
}
