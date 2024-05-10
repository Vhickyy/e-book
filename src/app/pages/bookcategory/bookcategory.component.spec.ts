import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcategoryComponent } from './bookcategory.component';

describe('BookcategoryComponent', () => {
  let component: BookcategoryComponent;
  let fixture: ComponentFixture<BookcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookcategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
