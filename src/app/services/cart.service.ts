import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  http = inject(HttpClient)
  constructor() { }

  // cart
  addCart(id:string | null): Observable<any> {
    console.log(id);
    
    return this.http.post("/api/v1/cart",{id})
  }

  getCart(){
    return this.http.get("/api/v1/cart")
  }

  removeCart(id:string) {
    return this.http.patch(`/api/v1/cart/${id}`,{})
  }

  clearCart (id:string) {
    return this.http.delete(`/api/v1/cart/clear-cart/${id}`)
  }

  // anonymous cart
  addAnonymousCart(id:string | null,uuid:string): Observable<any> {
    console.log(id,{uuid});
    return this.http.post("/api/v1/annonymous-cart",{book:id,uuid})
  }

  getAnnonymousCart(){
    const uuid = localStorage.getItem("uuid") || "";
    return this.http.get(`/api/v1/annonymous-cart/${uuid}`);
  }

  removeAnonymousCart(id:string) {
    const uuid = localStorage.getItem("uuid") || "";
    return this.http.patch(`/api/v1/annonymous-cart/${id}`,{uuid})
  }

  clearAnonymousCart (id:string) {
    return this.http.delete(`/api/v1/cart/clear-cart/${id}`)
  }

  // wishlist
  getWishlist () {
    return this.http.get("/api/v1/wishlist")
  }

  addToWishlist (id:string) {
    return this.http.post("/api/v1/wishlist",{book:id})
  }

  removeFromWishlist (id:string) {
    return this.http.delete(`/api/v1/wishlist/${id}`)
  }

  // orders
  makePayment (cartId:string) {
    // return this.http.post("/api/v1/payment",{email:"vee2@gmail.com",amount:200,name:"vee"})
    return this.http.post("/api/v1/order",{cartId})
  }

  verifyPayment (reference:string | null) {
    console.log(reference);
    
    // return this.http.post("/api/v1/payment",{email:"vee2@gmail.com",amount:200,name:"vee"})
    return this.http.get(`/api/v1/order/${reference}`)
  }
  
}
