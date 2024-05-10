import { Component,inject,OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { IBest } from '../../../types/types';
import { bestSellingBooks } from '../../../data/data';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  ngOnInit () {
  //   this.http.get<any>("/api/v1/book").subscribe(data=> console.log(data));
  //   this.http.get<any>(`/api/v1/book/66092797c4f577ef9b6125f3`).subscribe({
  //     next:data=> {
  //       console.log(data);
        
  //     },
  //     error: data => {
  //       console.log(data);
        
  //     }
  //   });
    // this.http.post("/api/v1/book",{
    //   title: "from angular",
    //   description: "test angular",
    //   pages:3,
    //   price:40,
    //   ISBN:879,
    //   publisher:"vee publishing",
    //   category: ["tech"],
    //   keywords: ["first","new"]
    // }).subscribe({
    //   next: (data) => {
    //     console.log(data);
        
    //   },
    //   error:(data) => {
    //     console.log(data);
        
    //   }
    // })
  }

}
