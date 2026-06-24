import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../core/models/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  newTitle = '';
  newAuthor = '';
  newGenre = '';
  newYear?: number;
  newNotes = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  addBook(): void {
    if (!this.newTitle || !this.newAuthor) return;
    this.bookService.addBook({
      title: this.newTitle,
      author: this.newAuthor,
      genre: this.newGenre,
      year: this.newYear,
      notes: this.newNotes,
      read: false
    });
    this.books = this.bookService.getBooks();
    this.newTitle = '';
    this.newAuthor = '';
    this.newGenre = '';
    this.newYear = undefined;
    this.newNotes = '';
  }

  deleteBook(id: string): void {
    this.bookService.deleteBook(id);
    this.books = this.bookService.getBooks();
  }

  toggleRead(id: string): void {
    this.bookService.toggleRead(id);
    this.books = this.bookService.getBooks();
  }
}