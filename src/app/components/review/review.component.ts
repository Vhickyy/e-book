import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { postReview } from '../../store/book/book.actions';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})


export class ReviewComponent {

  @Input() showReview!: boolean;
  @Input() id!: string | null;
  @Output() closeReview: EventEmitter<any> = new EventEmitter<any>();
  store = inject(Store);
  error: string = ""

  onCloseReview(){
    this.closeReview.emit()
  }

  reviewBook(data: NgForm){
    data.value.id = this.id;
    const {review, rate} = data.value
    console.log({data:data.value});
    if(Number(rate) > 5 || Number(rate) < 1){
      this.error = "Rating must be within 1-5";
      console.log("hiii");
      return
    }
    if(this.id) this.store.dispatch(postReview({review,rating:rate,id:this.id}))
  }

}
