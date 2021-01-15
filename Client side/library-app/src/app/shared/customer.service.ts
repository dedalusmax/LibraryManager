import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly url =  'https://localhost:5001/Customer';

formData: Customer;

  constructor(private _http: HttpClient) { }

  getCustomers(pageNumber: number = 1, pageSize: number = 5, searchString?: string, orderBy?: string, sortDirection?: 'asc' | 'desc') {

    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    let headers = new HttpHeaders();

    if(orderBy) params = params.append('orderBy', orderBy?.toString());
    if(sortDirection) params = params.append('sortDirection', sortDirection?.toString());
    if(searchString) params = params.append('searchString', searchString);

    return this._http.get<Customer []>(`${this.url}/GetAll`, { observe: 'response', params });
  }

  getCustomer(id: string) {
    return this._http.get(`${this.url}/GetAll/${id}`);
  }
  
  createCustomer(formData: Customer) {
    return this._http.post(`${this.url}/Create`, formData);
  }

  deleteCustomer(id) {
    return this._http.delete(`${this.url}/Delete/${id}`);
  }

  updateCustomer(formData: Customer) {
    return this._http.put(this.url + '/Update', formData);
  }
  
}

