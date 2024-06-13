import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class LibraryService {

  http = inject(HttpClient)

  constructor() { }

  getLibrary(): Observable<any> {
    return this.http.get("/api/v1/library")
  }

  getPdf(id:string | null): Observable<any> {
    return this.http.get(`/api/v1/library/${id}`)
  }

}
