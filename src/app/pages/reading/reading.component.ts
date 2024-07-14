import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { DashboardLayoutComponent } from '../../shared/dashboard-layout/dashboard-layout.component';
import { PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
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
  @ViewChild("PDF") pdf?:  PdfViewerComponent;

  ngOnInit(){
    this.paramsOb = this.route.paramMap.subscribe(data => {
      const id = data.get('id');
      this.store.dispatch(getPdf({id}))
    })
  }

  search(target: any){
    console.log("hhhhh");
    
    if(target.value){
      console.log("searcg");
      
      this.pdf?.eventBus.dispatch("find",{
        query: target.value,
        type: "again",
        caseSensitive: false,
        findPrevious: undefined,
        highlightAll: true,
        phraseSearch: true
      })
    }
  }
}
