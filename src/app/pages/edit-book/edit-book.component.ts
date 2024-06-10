import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectBook, selectBookLoading } from '../../store/book/book.selector';
import { addBook, editBook, getBook } from '../../store/book/book.actions';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder)
  addBookForm!: FormGroup;
  categories :string[] = ["Science","Technology","Health","Religion","Art","Finance"];
  frontCoverUrl : string | ArrayBuffer | null | undefined;
  backCoverUrl : string | ArrayBuffer | null | undefined;
  @ViewChild("front") frontCover!: ElementRef;
  @ViewChild("back") backCover!: ElementRef;
  @ViewChild("pdf") pdf!: ElementRef;
  store = inject(Store);
  loadingBook$ = this.store.select(selectBookLoading);
  route = inject(ActivatedRoute);
  id!: string | null;
  book$ = this.store.select(selectBook)
  bookOb!: Subscription
  loading$ = this.store.select(selectBookLoading);
  // book$ = this.store.select(getBook)

  ngOnInit(){
    this.addBookForm = this.fb.group({
      title: ['hey', [Validators.required,Validators.minLength(8),Validators.maxLength(25)]],
      price: ['', Validators.required],
      publisher: ['', Validators.required],
      dateOfPublication: ['',Validators.required],
      description: ['',Validators.required],
      category: ['science',Validators.required],
      keywords: [''],
      ISBN : ['',Validators.required],
      pages: ['',[Validators.required,Validators.min(3),Validators.max(1000),Validators.pattern('[0-9]*')]],
    })
    this.bookOb = this.book$.subscribe(data => {
      if(data){
        this.addBookForm.setValue({
          title: data.title || '',
          price: data.price || '',
          publisher: data.publisher || '',
          dateOfPublication: data.dateOfPublication || '',
          description: data.description || '',
          category: data.category || 'science',
          keywords: data.keywords || '',
          ISBN: data.ISBN || '',
          pages: data.pages || ''
        });
        this.frontCoverUrl = data.frontCover.secureUrl;
        this.backCoverUrl = data.backCover.secureUrl;
      }else{
        console.log('het');
        
        this.route.paramMap.subscribe(data => {
          this.id = data.get('id');
          this.store.dispatch(getBook({id:this.id}))
        })
      }
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

  editBookSubmit(event: Event){
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
    
    this.store.dispatch(editBook({id:this.id,book:formData}))
  }


  ngOnDestroy() {
    this.bookOb.unsubscribe();
  }

}

