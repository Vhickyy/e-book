import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

  @Input() showReview!: boolean;
  @Output() closeReview: EventEmitter<any> = new EventEmitter<any>();

  onCloseReview(){
    this.closeReview.emit()
  }

}
