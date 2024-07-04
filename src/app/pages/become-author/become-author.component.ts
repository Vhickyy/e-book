import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectLoading, selectUser } from '../../store/auth/auth.selector';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { becomeAuthor } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-become-author',
  standalone: true,
  imports: [FooterComponent,CommonModule,ImageCropperComponent,ReactiveFormsModule],
  templateUrl: './become-author.component.html',
  styleUrl: './become-author.component.css'
})

export class BecomeAuthorComponent {

  store = inject(Store)
  route = inject(ActivatedRoute)
  user$ = this.store.select(selectUser);
  fb = inject(FormBuilder);
  authorForm! : FormGroup;
  imgCrop! : File | undefined
  @ViewChild('file',{static:true}) inputFile!: ElementRef;
  showCrop = false;
  objectUrl: string | ArrayBuffer | null | undefined = null;
  imageUrl: string | ArrayBuffer | null | undefined = null;
  loading$ = this.store.select(selectLoading);
  // profile! : File | undefined

  
  ngOnInit() {
    this.authorForm = this.fb.group({
      bio: ['', [Validators.required, Validators.maxLength(30)]],
      location: ['', [Validators.required]],
      cardInfo: this.fb.group({
        bankName: ['', Validators.required],
        accountNumber: ['', Validators.required],
        bankHolder: ['', Validators.required]
      }),
      socials: this.fb.group({
        instagram: [''],
        twitter: ['']
      })
    });
  }

  becomeAuthor(){
    const formData = new FormData();
    console.log(this.authorForm.value);
    
    Object.keys(this.authorForm.value).forEach(key => {
      
      if(key == "cardInfo" || key == "socials"){
        formData.append(key, JSON.stringify(this.authorForm.value[key]));
      }else{
        formData.append(key, this.authorForm.value[key]);
      }
    });
    
    if(this.imgCrop){
      formData.append('profilePic', this.imgCrop);
    }
    
    this.store.dispatch(becomeAuthor({authorData:formData}));
  }

  selectAvatar(){
    this.inputFile.nativeElement.click()
  }

  uploadFile(e:Event){
    const fileInput = e.target as HTMLInputElement;
     if (fileInput.files && fileInput.files[0]) {
       this.showCrop = true
     }
  }

 imageCropped(event: ImageCroppedEvent) {
   console.log(this.inputFile.nativeElement.files[0]);
   const {blob, objectUrl} = event; 
   if(blob && objectUrl){
     this.imgCrop = new File([blob], this.inputFile.nativeElement.files[0].name, { type: 'image/png' });
     console.log({objectUrl });
     this.objectUrl = objectUrl;
   }
  }

 saveCrop(){
   this.showCrop = false
   this.imageUrl = this.objectUrl
  //  this.profile = this.imgCrop;
   
 }

 cancelCrop() {
   this.showCrop = false;
   this.objectUrl = ''
   this.imgCrop = undefined
 }

}
