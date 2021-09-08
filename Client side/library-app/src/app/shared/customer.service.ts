import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly url =  'https://localhost:5001/Customer';

formData: Customer;

  constructor(private _http: HttpClient) { }

  public getCustomers(pageNumber: number = 1, pageSize: number = 5, searchString?: string, orderBy?: string, sortDirection?: 'asc' | 'desc'): Observable<HttpResponse<Customer[]>> {

    let params: HttpParams = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    let headers: HttpHeaders = new HttpHeaders();

    if(orderBy) params = params.append('orderBy', orderBy?.toString());
    if(sortDirection) params = params.append('sortDirection', sortDirection?.toString());
    if(searchString) params = params.append('searchString', searchString);

    return this._http.get<Customer []>(`${this.url}/GetAll`, { observe: 'response', params });
  }

  public getCustomer(id: string): Observable<any> {
    return this._http.get(`${this.url}/Get/${id}`);
  }

  public getCustomerByCrdNumber(cardNumber: string): Observable<any> {
    return this._http.get(`${this.url}/GetByCardNumber/${cardNumber}`);
  }
  
  public createCustomer(formData: Customer): Observable<any> {
    return this._http.post(`${this.url}/Create`, formData);
  }

  public deleteCustomer(id: string): Observable<any> {
    return this._http.delete(`${this.url}/Delete/${id}`);
  }

  public updateCustomer(formData: Customer): Observable<any> {
    return this._http.put(this.url + '/Update', formData);
  }
  
}

