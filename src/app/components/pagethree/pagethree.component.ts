import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pagethree',
  standalone: true,
  imports: [],
  templateUrl: './pagethree.component.html',
  styleUrl: './pagethree.component.css'
})
export class PagethreeComponent {
  @Input() registerForm!: FormGroup;
  @Output()
  changePage: EventEmitter<any> = new EventEmitter<any>();
  @Output() register: EventEmitter<any> = new EventEmitter<any>();
  @Input() imageUrl: string | ArrayBuffer | null | undefined = null;

  onChangePage(){
    this.changePage.emit()
  }

  registerUser(){
    this.register.emit()
  }
}
