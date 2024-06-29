import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectLoading } from '../../store/auth/auth.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagethree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagethree.component.html',
  styleUrl: './pagethree.component.css'
})
export class PagethreeComponent {
  @Input() registerForm!: FormGroup;
  @Output() changePage: EventEmitter<any> = new EventEmitter<any>();
  @Output() register: EventEmitter<any> = new EventEmitter<any>();
  @Input() imageUrl: string | ArrayBuffer | null | undefined = null;
  store = inject(Store)
  loading$ = this.store.select(selectLoading);

  onChangePage(){
    this.changePage.emit()
  }

  registerUser(){
    this.register.emit()
  }

}
