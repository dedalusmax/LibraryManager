import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BookService } from '../shared/book.service';
import { tap, take, debounceTime } from 'rxjs/operators';
import { Book } from '../shared/book.model';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component';
import { Paging } from './paging.model';
import { PageEvent } from '@angular/material/paginator';
import { SortingModel } from './sorting.model';
import { Sort } from '@angular/material/sort';
import { Subject, Subscription } from 'rxjs';
import { LendService } from '../shared/lend.service';
import { keyframes, trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  animations: [
    trigger('deleteCreateSlide', [
      
      transition('* => void', [
        animate('700ms', keyframes([
          style({ backgroundColor: '#ff4c4c', opacity: 1, offset: 0}),
          style({ backgroundColor: '#ff4c4c', transform: 'translateX(100px)', opacity: 0.5, offset: 0.5}),
          style({ backgroundColor: '#ff4c4c', transform: 'translateX(-1000px)', opacity: 0, offset: 1})
        ]))
      ]),
      transition('void => *', [
        animate('700ms', keyframes([
          style({ backgroundColor: '#ADFF2F', transform: 'translateX(-1000px)', opacity: 1, offset: 0}),
          style({ backgroundColor: '#ADFF2F', transform: 'translateX(100px)', opacity: 0.5, offset: 0.9}),
          style({ backgroundColor: '#ADFF2F', transform: 'translateX(0px)', opacity: 0, offset: 1})
        ]))
      ])
    ]),
    trigger('fadeIn', [
      
      transition('void => *', [
        animate('1500ms ease-in', keyframes([
          style({ opacity: 0, offset: 0}),
          style({ opacity: 1, offset: 1})
        ]))
      ])
    ])
  ]
})
export class BookListComponent implements OnInit {

  dataSource: Book [];
  displayedColumns: string[] = ['title', 'author', 'publisher', 'dateOfPublication', 'status', 'actions'];

  paging = new Paging();
  sorting = new SortingModel;

  searchKey: string;
  filterSubject = new Subject();
  filterSubscription: Subscription;

  isDeleting: boolean;

  @ViewChild(MatTable, {static: false}) table: MatTable<Book>;

  constructor(private bookService: BookService, public dialog: MatDialog, private lendService: LendService) { }

  ngOnInit() {
    this.isDeleting = false;
    this.fetchBooks(this.paging.CurrentPage, this.paging.PageSize);
    this.handleFilter();
  }

  

  onCreate() {
    this.setDelete(true);
    let dialogRef = this.dialog.open(BookFormComponent);
    
    dialogRef.afterClosed().pipe(take(1))
      .subscribe((book: Book) => {

        console.log(book);

        if(!book) return;

        this.dataSource.push(book);
        this.table.renderRows();
      });
  }

  onUpdate(book: Book) {

    let dialogRef = this.dialog.open(BookFormComponent, {data: book});

    dialogRef.afterClosed().pipe(take(1))
      .subscribe((editedBook: Book) => {

        console.log(editedBook);

        if(!editedBook) return;

        const index = this.dataSource.findIndex(b => b.id == book.id);

        // update
        this.dataSource[index] = editedBook;
        
        this.table.renderRows();
          });
  }



  onDelete(id: string) {
    this.setDelete(true);
    this.bookService.deleteBook(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(book => book.id !== id);});
  }

  onLend(id: string) {
    this.setDelete(false);
    this.lendService.lendBook(id).subscribe((book:Book) => {

      const index = this.dataSource.findIndex(b => b.id == book.id);

        // update
        this.dataSource[index] = book;
        console.log('Book is lended');
        console.log(this.dataSource);
        this.table.renderRows();
      
    });
  }

  onReturn(id: string) {
    this.lendService.returnBook(id).subscribe((book:Book) => {
      const index = this.dataSource.findIndex(b => b.id == book.id);

        // update
        this.dataSource[index] = book;
        console.log('Book is returned');
        console.log(this.dataSource);
        this.table.renderRows();
    });
  }

  onPageChange(page: PageEvent) {
    this.setDelete(false);
    this.fetchBooks(page.pageIndex + 1, page.pageSize, this.searchKey, this.sorting.orderBy, this.sorting.sortDirection);
  }

  onSortChange(event: Sort) {
    console.log(event);
    console.log(this.paging.CurrentPage);
    console.log(this.paging.PageSize);
    const split = event.active.split('.');
    const orderBy = split[split.length - 1]; // only last property
    const sortDirection = event.direction as  'asc' | 'desc';

    this.fetchBooks(this.paging.CurrentPage, this.paging.PageSize, this.searchKey, orderBy, sortDirection);
    console.log(this.dataSource);
  }

  setDelete(setter) {
    this.isDeleting = setter;
  }

  setSortModel(orderBy?, sortDirection?) {
    this.sorting.orderBy = orderBy;
    this.sorting.sortDirection = sortDirection;
  }

  setPagemodel(res) {
    // retrieve paging headers
    let pagination = JSON.parse(res.headers.get('pagination')) as Paging;

    // update paging model
    // which reflects onto paginator in html
    this.paging.CurrentPage = pagination.CurrentPage;
    this.paging.PageSize = pagination.PageSize;
    this.paging.TotalCount = pagination.TotalCount;
  }

  applyFilter(searchKey) {
    this.filterSubject.next(searchKey);
  }

  handleFilter() {
    this.filterSubscription = this.filterSubject
    .pipe(debounceTime(500))
    .subscribe(searchKey => {
      this.searchKey = searchKey as string;
      this.fetchBooks(1, this.paging.PageSize, searchKey);
    });

  }

  fetchBooks(page, pageSize, searchString?, orderBy?, sortDirection?: 'asc' | 'desc'){
    this.bookService.getBooks(page, pageSize, searchString, orderBy, sortDirection).pipe(
      tap(res => this.dataSource = Object.assign([], res.body as  unknown as MatTableDataSource<Book[]>)))
      .subscribe(
        res => (this.setPagemodel(res), this.setSortModel(orderBy, sortDirection))
      );
  }

  

}
