import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { addId, deleteBook, getAuthorBooks } from '../../store/book/book.actions';
import { selectAuthorBook, selectBookIds, selectBookLoading } from '../../store/book/book.selector';
import { selectAuthor, selectUser } from '../../store/auth/auth.selector';
import { getAuthor } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule,NavbarComponent,FooterComponent,RouterLink],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit{

  store = inject(Store)
  route = inject(ActivatedRoute)
  authorBook$ = this.store.select(selectAuthorBook);
  user$ = this.store.select(selectUser);
  author$ = this.store.select(selectAuthor);
  authorId!: string | null
  id$ = this.store.select(selectBookIds);
  loading$ = this.store.select(selectBookLoading);

  ngOnInit(){
    this.route.paramMap.subscribe(data => {
      this.authorId = data.get('id');
      if(this.authorId) this.store.dispatch(getAuthor({id:this.authorId}))
      this.store.dispatch(getAuthorBooks({authorId:this.authorId}))
    })
  }

  deleteBook(id:string){
    this.store.dispatch(addId({id}));
    this.store.dispatch(deleteBook({id}))
  }

}
