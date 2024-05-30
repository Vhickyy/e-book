import { Component, OnInit, inject } from '@angular/core';
import { DashboardLayoutComponent } from '../../shared/dashboard-layout/dashboard-layout.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Store } from '@ngrx/store';
import { selectLibrary, selectLoading } from '../../store/library/library.selector';
import { getLibrary } from '../../store/library/library.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [DashboardLayoutComponent,FooterComponent,NavbarComponent,CommonModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit{

  store = inject(Store);
  library$ = this.store.select(selectLibrary);
  loading = this.store.select(selectLoading);

  ngOnInit(){
    this.store.dispatch(getLibrary());
  }

}
