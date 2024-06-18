import { Component, ElementRef, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { IBest } from '../../../types/types';
import { bestSellingBooks } from '../../../data/data';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { getBooks } from '../../store/book/book.actions';
import {  selectBookLoading, selectBooks, selectError, selectPages } from '../../store/book/book.selector';
import { addAnnonymousCart, addCart, addId, addWishlist, removeWishlist } from '../../store/cart/cart.actions';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { selectBookIds, seletCartLoading } from '../../store/cart/cart.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,NavbarComponent,FooterComponent,RouterLink,FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})

export class BooksComponent implements OnInit {
  category:string[] = ["All","Science","Technology","Health","Religion","Art","Finance"];
  // science:IBest[] = bestSellingBooks
  science: any = []
  http = inject(HttpClient);
  store = inject(Store);
  books$ = this.store.select(selectBooks);
  error$ = this.store.select(selectError)
  selectedCategory = "all";
  search = '';
  active = 0;
  pageSize$ = this.store.select(selectPages)
  pageSizeArray!: number[];
  show: boolean = true;
  loading$ = this.store.select(selectBookLoading)
  wishListLoading = this.store.select(seletCartLoading);
  id$ = this.store.select(selectBookIds);
  obs!: Subscription;

  @ViewChild('main',{ static: true }) main!: ElementRef;
  renderer: Renderer2 = inject(Renderer2)

  toggleSideBar(){
    this.show = !this.show;
    if (this.show) {
      this.renderer.removeClass(this.main.nativeElement, 'main2');
    } else {
      this.renderer.addClass(this.main.nativeElement, 'main2');
    }
  }

  ngOnInit(): void {
    this.pageSize$.subscribe(value => {
      this.pageSizeArray = Array.from({length: value}, (_, index) => index);
    });
    this.obs = this.books$.subscribe(book => {
      console.log({book});
      if(!book) {
        console.log("jdhd");
        
        return this.store.dispatch(getBooks({category:this.selectedCategory,search:this.search}))}
    })
    // this.store.dispatch(getBooks({category:this.selectedCategory,search:this.search}))
  }
  
  changeCategory(cat: string){
    this.selectedCategory = cat.toLowerCase();
    this.store.dispatch(getBooks({category:this.selectedCategory,search:this.search}));
    this.active = 0;
  }

  searchBook(){
    this.store.dispatch(getBooks({category:this.selectedCategory,search:this.search}));
    this.active = 0;
  }

  addWishlist(id: string){
    console.log("add");
    
    this.store.dispatch(addId({id}))
    this.store.dispatch(addWishlist({id}))
    
  }

  removeFromWishlist(id:string){
    console.log("rem");
    
    this.store.dispatch(addId({id}))
    this.store.dispatch(removeWishlist({id}))
  }

  changeActive (index: number) {
    if(this.active == index) return
    this.active = index;
    this.store.dispatch(getBooks({category:this.selectedCategory,search:this.search,page:this.active + 1}));
  }

  nextPage() {
    if(this.active == this.pageSizeArray.length - 1) return;
    if(this.active < this.pageSizeArray.length - 1){
      console.log(this.active);
      this.active++
      console.log(this.active);
      this.store.dispatch(getBooks({category:this.selectedCategory,search:this.search,page:this.active + 1}));
    }
  }

  prevPage() {
    if(this.active == 0) return;
    if(this.active < this.pageSizeArray.length){
      console.log(this.active);
      this.active--
      console.log(this.active);
      
      this.store.dispatch(getBooks({category:this.selectedCategory,search:this.search,page:this.active + 1}));
    }
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }

}
