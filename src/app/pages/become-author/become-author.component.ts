import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectUser } from '../../store/auth/auth.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-become-author',
  standalone: true,
  imports: [FooterComponent,CommonModule],
  templateUrl: './become-author.component.html',
  styleUrl: './become-author.component.css'
})
export class BecomeAuthorComponent {
  store = inject(Store)
  route = inject(ActivatedRoute)
  user$ = this.store.select(selectUser);

}
