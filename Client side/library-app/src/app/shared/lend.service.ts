import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LendService {

  private readonly url =  'https://localhost:5001/Lend';

  constructor(private _http: HttpClient) { }

  public lendBook(id: string, cardNumber: string): Observable<any> {
    return this._http.get(`${this.url}/Lend/${id}?lenderCardNumber=${cardNumber}`);
  }

  public returnBook(id: string, cardNumber: string): Observable<any> {
    return this._http.get(`${this.url}/Return/${id}?lenderCardNumber=${cardNumber}`);
  }

  
}
