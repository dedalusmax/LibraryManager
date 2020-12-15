import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

readonly url =  'https://localhost:5001/Book';

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get(`${this.url}/GetAll`);
  }
}
