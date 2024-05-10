import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagetwo',
  standalone: true,
  imports: [],
  templateUrl: './pagetwo.component.html',
  styleUrl: './pagetwo.component.css'
})
export class PagetwoComponent {
  @Output()
  changePage: EventEmitter<any> = new EventEmitter<any>();

  onChangePage(){
    this.changePage.emit()
  }
}
