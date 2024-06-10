import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { addBook } from '../../store/book/book.actions';
import { selectBookLoading } from '../../store/book/book.selector';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})

export class AddBookComponent implements OnInit {
  fb = inject(FormBuilder)
  addBookForm!: FormGroup;
  // progress$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  categories :string[] = ["Science","Technology","Health","Religion","Art","Finance"];
  frontCoverUrl : string | ArrayBuffer | null | undefined;
  backCoverUrl : string | ArrayBuffer | null | undefined;
  @ViewChild("front") frontCover!: ElementRef;
  @ViewChild("back") backCover!: ElementRef;
  @ViewChild("pdf") pdf!: ElementRef;
  // http = inject(HttpClient)
  store = inject(Store);
  loadingBook$ = this.store.select(selectBookLoading);

  ngOnInit(){
    this.addBookForm = this.fb.group({
      title: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(25)]],
      price: ['', Validators.required],
      publisher: ['', Validators.required],
      dateOfPublication: ['',Validators.required],
      description: ['',Validators.required],
      category: ['science',Validators.required],
      keywords: [''],
      ISBN : ['',Validators.required],
      pages: ['',[Validators.required,Validators.min(3),Validators.max(1000),Validators.pattern('[0-9]*')]],
      // frontCover: [''],
      // backCover:[''],
      // pdf: ['']
    })
  }

  upload(type:string){
    if(type == "front") return this.frontCover.nativeElement.click();
    if(type == "back") return this.backCover.nativeElement.click();
    if(type == "pdf") return this.pdf.nativeElement.click();
  }

  handleFileInput(e:Event,type:string){
    const fileInput = e.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if(type == 'front') {
          this.frontCoverUrl = e.target?.result
          this.addBookForm.patchValue({
            frontCover : file.name
          })
          
        }else if(type == 'back'){
          this.backCoverUrl = e.target?.result
          this.addBookForm.patchValue({
            backCover: file.name
          })
        }else {
          this.addBookForm.patchValue({
            pdf: file.name
          })
        }
      };
      reader.readAsDataURL(file);
      }
    }

  addBookSubmit(event: Event){
    event.preventDefault();
    const formData = new FormData();

    // Append form values to FormData
    Object.keys(this.addBookForm.value).forEach(key => {
      formData.append(key, this.addBookForm.value[key]);
    });
    formData.append('frontCover', this.frontCover.nativeElement.files[0]);
    formData.append('backCover', this.backCover.nativeElement.files[0]);
    formData.append('pdf', this.pdf.nativeElement.files[0]);
    // console.log(formData);
    
    this.store.dispatch(addBook({book:formData}))
  }

}



// upload.component.ts
// import { Component } from '@angular/core';
// import { HttpClient, HttpEventType } from '@angular/common/http';
// import { LoaderService } from 'path-to-loader-service';
// import { BehaviorSubject } from 'rxjs';

// @Component({
//   selector: 'app-upload',
//   templateUrl: './upload.component.html',
//   styleUrls: ['./upload.component.css']
// })
// export class UploadComponent {
//   progress$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

//   constructor(private http: HttpClient, private loaderService: LoaderService) {}

//   uploadFile(event: any) {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);

//     this.loaderService.showLoader();

//     this.http.post('your-backend-url', formData, {
//       reportProgress: true,
//       observe: 'events'
//     }).subscribe(event => {
//       if (event.type === HttpEventType.UploadProgress) {
//         const progress = Math.round(100 * event.loaded / event.total);
//         this.progress$.next(progress);
//       } else if (event.type === HttpEventType.Response) {
//         this.loaderService.hideLoader();
//         // File uploaded successfully
//       }
//     });
//   }
// }

// <!-- progress-bar.component.html -->
// <div class="progress">
//   <div class="progress-bar" [style.width.%]="progress"></div>
// </div>


/* progress-bar.component.css */
// .progress {
//   width: 100%;
//   background-color: #f0f0f0;
// }

// .progress-bar {
//   height: 20px;
//   background-color: #007bff;
// }

// loader.service.ts
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoaderService {
//   private loadingSubject = new BehaviorSubject<boolean>(false);
//   loading$ = this.loadingSubject.asObservable();

//   showLoader() {
//     this.loadingSubject.next(true);
//   }

//   hideLoader() {
//     this.loadingSubject.next(false);
//   }
// }

