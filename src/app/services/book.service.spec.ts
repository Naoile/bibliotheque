import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a book to the list', () => {
    service.addBook({
      title: 'Le Petit Prince',
      author: 'Saint-Exupéry',
      read: false
    });
    const books = service.getBooks();
    expect(books.length).toBe(1);
    expect(books[0].title).toBe('Le Petit Prince');
  });

  it('should delete a book by id', () => {
    service.addBook({ title: 'Dune', author: 'Frank Herbert', read: false });
    const books = service.getBooks();
    service.deleteBook(books[0].id);
    expect(service.getBooks().length).toBe(0);
  });

  it('should toggle read status of a book', () => {
    service.addBook({ title: '1984', author: 'Orwell', read: false });
    const book = service.getBooks()[0];
    service.toggleRead(book.id);
    expect(service.getBooks()[0].read).toBe(true);
  });
});