import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  totalBooks = 0;
  readBooks = 0;
  toReadBooks = 0;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    const books = this.bookService.getBooks();
    this.totalBooks = books.length;
    this.readBooks = books.filter(b => b.read).length;
    this.toReadBooks = books.filter(b => !b.read).length;
  }
}