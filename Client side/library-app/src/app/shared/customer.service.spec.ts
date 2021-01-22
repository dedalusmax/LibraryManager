import { fakeAsync, getTestBed, TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Customer } from './customer.model';

describe('CustomerService', () => {

  let injector: TestBed;
  let httpMock: HttpTestingController;  
  let service: CustomerService;

  beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CustomerService],
    });

    injector = getTestBed();
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should GET customers from the API', () => {
    
    const dummyPosts: Customer[] = [{
        id: '1',
        cardNumber: '155',
        firstName: 'Mario',
        lastName: 'Maric',
        email: 'mariomaric@gmail.com',
        lendedBooks: []
      }, {
        id: '2',
        cardNumber: '255',
        firstName: 'Sandra',
        lastName: 'Sandric',
        email: 'sandrasandric@gmail.com',
        lendedBooks: []
      }];
        
    service.getCustomers().subscribe(customers => {
        expect(customers.body.length).toBe(2);
        expect(customers.body[0].firstName).toBe('Mario');
        expect(customers.body[1].firstName).toBe('Sandra');
        expect(customers.body).toEqual(dummyPosts);
    });
    const request = httpMock.expectOne( `${service.url}/GetAll?pageNumber=1&pageSize=5`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
    });

    it('should GET customer by id from the API', () => {
    
        let dummyPosts: Customer[] = [
        {
            id: '1',
            cardNumber: '155',
            firstName: 'Mario',
            lastName: 'Maric',
            email: 'mariomaric@gmail.com',
            lendedBooks: []
        }, 
        {
            id: '2',
            cardNumber: '255',
            firstName: 'Sandra',
            lastName: 'Sandric',
            email: 'sandrasandric@gmail.com',
            lendedBooks: []
        }];

            
        service.getCustomer(dummyPosts[1].id).subscribe( (customer: Customer) => {
            expect(customer).toEqual(dummyPosts[1]);
        });
        const request = httpMock.expectOne( `${service.url}/Get/${dummyPosts[1].id}`);
        expect(request.request.method).toBe('GET');
        request.flush(dummyPosts[1]);
        });

    it('should GET customer by card number from the API', () => {
    
        let dummyPosts: Customer[] = [
        {
            id: '1',
            cardNumber: '155',
            firstName: 'Mario',
            lastName: 'Maric',
            email: 'mariomaric@gmail.com',
            lendedBooks: []
        }, 
        {
            id: '2',
            cardNumber: '255',
            firstName: 'Sandra',
            lastName: 'Sandric',
            email: 'sandrasandric@gmail.com',
            lendedBooks: []
        }];

            
        service.getCustomerByCrdNumber('255').subscribe( (customer: Customer) => {
            expect(customer).toEqual(dummyPosts[1]);
        });
        const request = httpMock.expectOne( `${service.url}/GetByCardNumber/255`);
        expect(request.request.method).toBe('GET');
        request.flush(dummyPosts[1]);
        });

    it('should POST and return data', () => {

        const formData: Customer = {
            id: '3',
            cardNumber: '355',
            firstName: 'Lovro',
            lastName: 'Lovric',
            email: 'lovrolovric@gmail.com',
            lendedBooks: []
        };

        service.createCustomer(formData).subscribe((res) => {
          expect(res).toEqual(formData);
        });

        const req = httpMock.expectOne(`${service.url}/Create`);
        expect(req.request.method).toBe('POST');
        req.flush(formData);
      }); 

      it('should PUT and return data', () => {

        const formData: Customer = {
            id: '3',
            cardNumber: '355',
            firstName: 'Lovro',
            lastName: 'Lovric',
            email: 'lovrolovric@gmail.com',
            lendedBooks: []
        };

        service.updateCustomer(formData).subscribe((res) => {
          expect(res).toEqual(formData);
        });
    
        const req = httpMock.expectOne(`${service.url}/Update`);
        expect(req.request.method).toBe('PUT');
        req.flush(formData);
      }); 

      it('should DELETE and return id', () => {

        const id: string = '3';

        service.deleteCustomer(id).subscribe((res) => {
          expect(res).toEqual(id);
        });
    
        const req = httpMock.expectOne(`${service.url}/Delete/${id}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(id);
      }); 



  afterEach(() => {
    httpMock.verify();
});
});