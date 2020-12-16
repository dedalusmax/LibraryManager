import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

readonly url =  'https://localhost:5001/Book';

formData: Book;

  constructor(private _http: HttpClient) { }

  getBooks() {
    return this._http.get(`${this.url}/GetAll`);
  }
  
  createBook(formData: Book) {
    return this._http.post(`${this.url}/Create`, formData)
  }
}
