import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pageone',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterModule],
  templateUrl: './pageone.component.html',
  styleUrl: './pageone.component.css'
})
export class PageoneComponent {
  @Input() registerForm! :FormGroup;
  @ViewChild('file') inputFile!: ElementRef;
  @Input() imageUrl: string | ArrayBuffer | null | undefined = null;

  @Output() changePage: EventEmitter<any> = new EventEmitter<any>();
  @Output() image: EventEmitter<any> = new EventEmitter<any>()

  onChangePage(){
    this.changePage.emit()
  }

  upload(){
    const img = this.inputFile.nativeElement.click();
  }
  
  handleFileInput(e:Event){
    const fileInput = e.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        // Set the image URL to display on the UI
        this.image.emit(e.target?.result);
      };
      reader.readAsDataURL(file);
      // console.log(file);
      this.registerForm.patchValue({
        profile: file.name
      })
    }
  }
}
