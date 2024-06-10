import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Store } from '@ngrx/store';
import { selectAuthorBook } from '../../store/book/book.selector';
import { selectUser } from '../../store/auth/auth.selector';
import { ActivatedRoute } from '@angular/router';
import { getAuthorBooks } from '../../store/book/book.actions';

@Component({
  selector: 'app-author-edit',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './author-edit.component.html',
  styleUrl: './author-edit.component.css'
})
export class AuthorEditComponent {

  route = inject(ActivatedRoute)
  store = inject(Store)
  authorBook$ = this.store.select(selectAuthorBook);
  user$ = this.store.select(selectUser);
  authorId!: string | null

  ngOnInit(){
    this.route.paramMap.subscribe(data => {
      this.authorId = data.get('id');
      this.store.dispatch(getAuthorBooks({authorId:this.authorId}))
    })
  }
  
}
