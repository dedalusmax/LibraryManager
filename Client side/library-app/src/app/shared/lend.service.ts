import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LendService {

  readonly url =  'https://localhost:5001/Lend';

  constructor(private _http: HttpClient) { }

  lendBook(id: string) {
    return this._http.get(`${this.url}/Lend/${id}`);
  }

  returnBook(id: string) {
    return this._http.get(`${this.url}/Return/${id}`);
  }

  
}
