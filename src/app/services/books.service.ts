import { Injectable } from '@angular/core';
import { Author } from '../modals/products';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable(
  { providedIn: 'root' }
)
export class BooksService {

  API_URL = 'https://s3.amazonaws.com/api-fun';
  getBooksUrl = '/books.json';

  constructor(private httpClient: HttpClient) {
  }

  getBooks(): Observable<Author> {
    return this.httpClient.get<Author>(`${this.API_URL}${this.getBooksUrl}`).pipe(map((event: any) => event.data));
  }

  // getBook(bookId: number): Observable<Book> {
  //   return of(this.listBook[bookId]);
  // }


}