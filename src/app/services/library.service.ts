import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})


export class LibraryService {

  http = inject(HttpClient)

  constructor() { }

  getLibrary(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/library`)
  }

  getPdf(id:string | null): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/library/${id}`)
  }

}
