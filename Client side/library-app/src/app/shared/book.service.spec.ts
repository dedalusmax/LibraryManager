import { getTestBed, TestBed } from '@angular/core/testing';

import { BookService } from './book.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Book } from './book.model';

describe('BookService', () => {

  let injector: TestBed;
  let httpMock: HttpTestingController;  
  let service: BookService;

  beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [BookService],
    });

    injector = getTestBed();
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should GET books from the API', () => {
    
    const dummyBooks: Book[] = [{
        id: '1',
        title: 'First Title',
        author: 'First Author',
        publisher: 'FIrst Publisher',
        dateOfPublication: new Date(),
        isLended: false,
        lender: null
      }, {
        id: '2',
        title: 'Second Title',
        author: 'Second Author',
        publisher: 'Second Publisher',
        dateOfPublication: new Date(),
        isLended: false,
        lender: null
      }];
        
    service.getBooks().subscribe( books => {
        expect(books.body.length).toBe(2);
        expect(books.body[0].title).toBe('First Title');
        expect(books.body[1].title).toBe('Second Title');
        expect(books.body).toEqual(dummyBooks);
    });
    const request = httpMock.expectOne( `${service.url}/GetAll?pageNumber=1&pageSize=5`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyBooks);
    });

    it('should GET book by id from the API', () => {
    
        let dummyPosts: Book [] = [
            {
                id: '1',
                title: 'First Title',
                author: 'First Author',
                publisher: 'FIrst Publisher',
                dateOfPublication: new Date(),
                isLended: false,
                lender: null
              }, {
                id: '2',
                title: 'Second Title',
                author: 'Second Author',
                publisher: 'Second Publisher',
                dateOfPublication: new Date(),
                isLended: false,
                lender: null
              }];

            
        service.getBook(dummyPosts[1].id).subscribe( (book: Book) => {
            expect(book).toEqual(dummyPosts[1]);
        });
        const request = httpMock.expectOne( `${service.url}/Get/${dummyPosts[1].id}`);
        expect(request.request.method).toBe('GET');
        request.flush(dummyPosts[1]);
        });

    it('should POST and return data', () => {

        const formData: Book = {
                id: '3',
                title: 'Third Title',
                author: 'Third Author',
                publisher: 'Third Publisher',
                dateOfPublication: new Date(),
                isLended: false,
                lender: null
              };

        service.createBook(formData).subscribe((res) => {
            expect(res).toEqual(formData);
        });

        const req = httpMock.expectOne(`${service.url}/Create`);
        expect(req.request.method).toBe('POST');
        req.flush(formData);
        }); 

    it('should PUT and return data', () => {

    const formData: Book = {
            id: '3',
            title: 'Third Title',
            author: 'Third Author',
            publisher: 'Third Publisher',
            dateOfPublication: new Date(),
            isLended: false,
            lender: null
          };

    service.updateBook(formData).subscribe((res) => {
        expect(res).toEqual(formData);
    });

    const req = httpMock.expectOne(`${service.url}/Update`);
    expect(req.request.method).toBe('PUT');
    req.flush(formData);
    });   

    it('should DELETE and return id', () => {

        const id: string = '3';

        service.deleteBook(id).subscribe((res) => {
          expect(res).toEqual(id);
        });
    
        const req = httpMock.expectOne(`${service.url}/Delete/${id}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(id);
      }); 



  afterEach(() => {
    httpMock.verify();});
 
});