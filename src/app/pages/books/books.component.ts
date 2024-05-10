import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { IBest } from '../../../types/types';
import { bestSellingBooks } from '../../../data/data';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { getBooks } from '../../store/book/book.actions';
import {  selectBooks, selectIncart } from '../../store/book/book.selector';
import { addAnnonymousCart, addCart, addWishlist, removeWishlist } from '../../store/cart/cart.actions';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  token = localStorage.getItem("token");
  selectedCategory = "all";
  search = '';

  ngOnInit(): void {
    // this.science = this.science.splice(0,3)
    // this.http.get("/api/v1/book").subscribe((data :any)=>{
    //   this.science = data.data
    // })
    this.store.dispatch(getBooks({category:this.selectedCategory,search:this.search}))
  }

  // addToAnnonymousCart(id:string){
  //   console.log(id,this.token);
  //   if(this.token){
  //     return this.store.dispatch(addCart({id}));
  //   }
  //   return this.store.dispatch(addAnnonymousCart({id}));
  // }
  
  changeCategory(cat: string){
    this.selectedCategory = cat.toLowerCase();
    this.store.dispatch(getBooks({category:this.selectedCategory,search:this.search}))
  }

  searchBook(){
    this.store.dispatch(getBooks({category:this.selectedCategory,search:this.search}))
  }

  addWishlist(id: string){
    this.store.dispatch(addWishlist({id}))
  }

  removeFromWishlist(id:string){
    this.store.dispatch(removeWishlist({id}))
  }
}
