import { Component,inject,OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { IBest } from '../../../types/types';
import { bestSellingBooks } from '../../../data/data';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectBookLoading, selectBooks } from '../../store/book/book.selector';
import { getBooks } from '../../store/book/book.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  bestSelling: IBest[] = bestSellingBooks;
  http : HttpClient = inject(HttpClient)
  store = inject(Store);
  books$ = this.store.select(selectBooks);
  loading$ = this.store.select(selectBookLoading)

  ngOnInit(): void {
    
    this.store.dispatch(getBooks({category:"all",search:''}))
  }

}
