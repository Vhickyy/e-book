import { Component, OnInit, inject } from '@angular/core';
import { DashboardLayoutComponent } from '../../shared/dashboard-layout/dashboard-layout.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { getPdf } from '../../store/library/library.actions';
import { selectPdf } from '../../store/library/library.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [DashboardLayoutComponent,PdfViewerModule, CommonModule],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.css'
})
export class ReadingComponent implements OnInit {
  store = inject(Store);
  paramsOb!: Subscription
  route = inject(ActivatedRoute);
  pdf$ = this.store.select(selectPdf);

  ngOnInit(){
    this.paramsOb = this.route.paramMap.subscribe(data => {
      const id = data.get('id');
      this.store.dispatch(getPdf({id}))
    })
  }

}
