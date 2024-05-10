import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  http = inject(HttpClient)

  constructor() { }

  // book
  getAllBook (category = "all",search: string) {
    return this.http.get(`/api/v1/books?category=${category}&search=${search}`)
  }

  getBook (id:string | null) {
    return this.http.get(`/api/v1/books/${id}`)
  }

  addBook (book: any) {
    return this.http.post("/api/v1/books",book)
  }

  deleteBook (id:string) {
    return this.http.delete(`/api/v1/${id}`)
  }


  
}
