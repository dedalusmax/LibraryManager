import { async, fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';

import { CustomerService } from './customer.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Customer } from './customer.model';
import { BookService } from './book.service';
import { LendService } from './lend.service';
import { Book } from './book.model';

describe('lendService', () => {

  let injector: TestBed;
  let httpMock: HttpTestingController;  

  let service: LendService;
  

  beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [LendService, CustomerService, BookService],
    });

    injector = getTestBed();
    service = TestBed.inject(LendService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should LEND book', fakeAsync( () => {
    
    const dummyBook: Book = {
        id: '3',
        title: 'Third Title',
        author: 'Third Author',
        publisher: 'Third Publisher',
        dateOfPublication: new Date(),
        isLended: true,
        lender: {
            id: '1',
            cardNumber: '155',
            firstName: 'Mario',
            lastName: 'Maric',
            email: 'mariomaric@gmail.com',
            lendedBooks: []
          }
      }; 

      const dummyCustomer: Customer = {
        id: '1',
        cardNumber: '155',
        firstName: 'Mario',
        lastName: 'Maric',
        email: 'mariomaric@gmail.com',
        lendedBooks: [dummyBook]
      };


      service.lendBook('3', '155').subscribe( (book: Book) => {
        tick(300);
        expect(book.lender).toEqual(dummyCustomer);
        expect(book.isLended).toBe(true);
        expect(book).toEqual(dummyBook);
       
    });

    const request = httpMock.expectOne( `${service.url}/Lend/${dummyBook.id}?lenderCardNumber=${dummyCustomer.cardNumber}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyBook);
    }));  

    it('should RETURN book', fakeAsync( () => {
    
        const dummyBook: Book = {
            id: '3',
            title: 'Third Title',
            author: 'Third Author',
            publisher: 'Third Publisher',
            dateOfPublication: new Date(),
            isLended: false,
            lender: null
          }; 
    
          const dummyCustomer: Customer = {
            id: '1',
            cardNumber: '155',
            firstName: 'Mario',
            lastName: 'Maric',
            email: 'mariomaric@gmail.com',
            lendedBooks: []
          };
    
    
          service.lendBook('3', '155').subscribe( (book: Book) => {
            tick(300);
            expect(book.lender).toEqual(null);
            expect(book.isLended).toBe(false);
            expect(book).toEqual(dummyBook);
           
        });
    
        const request = httpMock.expectOne( `${service.url}/Return/${dummyBook.id}?lenderCardNumber=${dummyCustomer.cardNumber}`);
        expect(request.request.method).toBe('GET');
        request.flush(dummyBook);
        }));  

});