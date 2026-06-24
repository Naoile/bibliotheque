import { Injectable } from '@angular/core';
import { Book } from '../core/models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private storageKey = 'bibliotheque_books';

  getBooks(): Book[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addBook(book: Omit<Book, 'id'>): void {
    const books = this.getBooks();
    const newBook: Book = {
      ...book,
      id: crypto.randomUUID()
    };
    books.push(newBook);
    this.saveBooks(books);
  }

  deleteBook(id: string): void {
    const books = this.getBooks().filter(b => b.id !== id);
    this.saveBooks(books);
  }

  toggleRead(id: string): void {
    const books = this.getBooks().map(b =>
      b.id === id ? { ...b, read: !b.read } : b
    );
    this.saveBooks(books);
  }

  updateBook(updated: Book): void {
    const books = this.getBooks().map(b =>
      b.id === updated.id ? updated : b
    );
    this.saveBooks(books);
  }

  private saveBooks(books: Book[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(books));
  }
}