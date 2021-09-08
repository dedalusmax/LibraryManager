import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Book } from './book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

private readonly url =  'https://localhost:5001/Book';

formData: Book;

  constructor(private _http: HttpClient) { }

  public getBooks(pageNumber: number = 1, pageSize: number = 5, searchString?: string, orderBy?: string, sortDirection?: 'asc' | 'desc'): Observable<HttpResponse<Book[]>> {

    let params: HttpParams = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    let headers: HttpHeaders = new HttpHeaders();

    if(orderBy) params = params.append('orderBy', orderBy?.toString());
    if(sortDirection) params = params.append('sortDirection', sortDirection?.toString());
    if(searchString) params = params.append('searchString', searchString);

    return this._http.get<Book []>(`${this.url}/GetAll`, { observe: 'response', params });
  }

  public getBook(id: string): Observable<any> {
    return this._http.get(`${this.url}/Get/${id}`);
  }
  
  public createBook(formData: Book): Observable<any> {
    return this._http.post(`${this.url}/Create`, formData);
  }

  public deleteBook(id: string): Observable<any> {
    return this._http.delete(`${this.url}/Delete/${id}`);
  }

  public updateBook(formData: Book): Observable<any> {
    return this._http.put(this.url + '/Update', formData);
  }
  
}
