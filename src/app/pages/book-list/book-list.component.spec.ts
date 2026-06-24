import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BookListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});