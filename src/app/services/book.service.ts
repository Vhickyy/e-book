import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  http = inject(HttpClient)
  search = '';
  // @Output() searchBook = new EventEmitter<string>()

  constructor() { }



  // book
  getAllBook (category = "all",search: string,page?:number) {
    return this.http.get(`${environment.apiUrl}/api/v1/books?category=${category}&search=${search}&page=${page}`)
  }

  getAuthorBooks (authorId:string | null) {
    // console.log({authorId});
    
    return this.http.get(`${environment.apiUrl}/api/v1/books/author/${authorId}`)
  }

  getBook (id:string | null) {
    const uuid = localStorage.getItem("uuid")
    return this.http.get(`${environment.apiUrl}/api/v1/books/${id}?uuid=${uuid}`)
  }

  addBook (book: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/books`,book)
  }

  updateBook (id: string | null,book:any) {
    return this.http.patch(`${environment.apiUrl}/api/v1/books/${id}`,book)
  }

  deleteBook (id:string) {
    return this.http.delete(`${environment.apiUrl}/api/v1/books/${id}`)
  }


  
}
