import { Component, ElementRef, OnInit, ViewChild, inject} from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { PageoneComponent } from '../../components/pageone/pageone.component';
import { PagetwoComponent } from '../../components/pagetwo/pagetwo.component';
import { PagethreeComponent } from '../../components/pagethree/pagethree.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { registerUser } from '../../store/auth/auth.actions';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,CommonModule,PageoneComponent,PagetwoComponent,PagethreeComponent,ReactiveFormsModule,RouterModule,ImageCropperComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  imgCrop! : File | undefined
  page: number = 1;
  fb = inject(FormBuilder);
  registerForm! : FormGroup;
  imageUrl: string | ArrayBuffer | null | undefined = null;
  store = inject(Store);
  @ViewChild('file',{static:true}) inputFile!: ElementRef;
  showCrop: boolean = false;
  reader = new FileReader();
  objectUrl: string | ArrayBuffer | null | undefined = null;
  profile! : File | undefined

  ngOnInit(){
    this.registerForm = this.fb.group({
      fullname: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(25)]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      'confirm-password': ['',Validators.required],
      // profile: [''],
      interest: ['']
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
    const formData = new FormData();
    
    Object.keys(this.registerForm.value).forEach(key => {
      formData.append(key, this.registerForm.value[key]);
    });
    
    if(this.imgCrop){
      formData.append('profilePic', this.imgCrop);
    }
      

    this.store.dispatch(registerUser({user:formData}));
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
    this.profile = this.imgCrop;
  }

  cancelCrop() {
    this.showCrop = false;
    this.objectUrl = ''
    this.imgCrop = undefined
  }
}
