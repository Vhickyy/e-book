import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { IBest } from '../../../types/types';
import { bestSellingBooks } from '../../../data/data';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Store } from '@ngrx/store';
// import image from "../../../assets/Rectangle 10.png"

@Component({
  selector: 'app-bookcategory',
  standalone: true,
  imports: [CommonModule,NavbarComponent,FooterComponent,HeaderComponent],
  templateUrl: './bookcategory.component.html',
  styleUrl: './bookcategory.component.css'
})

export class BookcategoryComponent implements OnInit {
  category:string[] = ["Science","Technology","Health","Religion","Art","Finance"];
  science:IBest[] = bestSellingBooks;
  title: string = ""
  store = inject(Store)
  constructor(private route:ActivatedRoute){
    // console.log(route.url);
  }

  ngOnInit(): void {
    // console.log(route);
    
  }

  // addCartItem(id:string){
  //   this.store.dispatch(this.addCartid))
  // }
}
