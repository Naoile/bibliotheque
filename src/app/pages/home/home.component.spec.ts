import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { BookService } from '../../services/book.service';

describe('HomeComponent', () => {
  let mockBookService: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    mockBookService = jasmine.createSpyObj('BookService', ['getBooks']);
    mockBookService.getBooks.and.returnValue([
      { id: '1', title: 'Le Petit Prince', author: 'Saint-Exupéry', read: true },
      { id: '2', title: 'Dune', author: 'Frank Herbert', read: false }
    ]);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
      providers: [
        { provide: BookService, useValue: mockBookService }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should calculate book statistics correctly', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.totalBooks).toBe(2);
    expect(component.readBooks).toBe(1);
    expect(component.toReadBooks).toBe(1);
  });
});