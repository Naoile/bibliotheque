import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookListComponent } from './pages/book-list/book-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BookListComponent },
  { path: '**', redirectTo: '' }
];