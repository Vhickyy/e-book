import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pageone',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterModule,CommonModule],
  templateUrl: './pageone.component.html',
  styleUrl: './pageone.component.css',
})

export class PageoneComponent {
  @Input() registerForm! :FormGroup;
  @Input() inputFile!: ElementRef;
  @Input() imageUrl: string | ArrayBuffer | File | null | undefined = null;

  @Output() changePage: EventEmitter<any> = new EventEmitter<any>();
  pass = false
  confirm = false

  onChangePage(){
    const match = this.registerForm.get('password')?.value == this.registerForm.get('confirm-password')?.value
    // if(this.registerForm.valid && match){
    //   this.changePage.emit()
    // }
    this.changePage.emit();
    
  }

  upload(){
    const img = this.inputFile.nativeElement.click();
  }

  show(data:string){
    if(data == 'pass'){
      this.pass = !this.pass
      return
    }
    this.confirm = !this.confirm
  }
 
}
