import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  dataSource: Book [];
  displayedColumns: string[] = ['title', 'author', 'publisher', 'dateOfPublication', 'actions'];

  paging = new Paging();
  sorting = new SortingModel;

  searchKey: string;
  filterSubject = new Subject();
  filterSubscription: Subscription;

  @ViewChild(MatTable, {static: false}) table: MatTable<Book>;

  constructor(private bookService: BookService, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchBooks(this.paging.CurrentPage, this.paging.PageSize);
    this.handleFilter();
  }

  

  onCreate() {
    let dialogRef = this.dialog.open(BookFormComponent);
    
    dialogRef.afterClosed().pipe(take(1))
      .subscribe((book: Book) => {

        console.log(book);

        if(!book) return;

        this.dataSource.push(book);
        this.table.renderRows();
      })
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
          })
    
  }



  onDelete(id: string) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(book => book.id !== id)})
  }

  onPageChange(page: PageEvent) {
    this.fetchBooks(page.pageIndex + 1, page.pageSize, this.searchKey, this.sorting.orderBy, this.sorting.sortDirection)
  }

  onSortChange(event: Sort) {
    console.log(event);
    console.log(this.paging.CurrentPage);
    console.log(this.paging.PageSize);
    const split = event.active.split('.');
    const orderBy = split[split.length - 1]; // only last property
    const sortDirection = event.direction as  'asc' | 'desc';

    this.fetchBooks(this.paging.CurrentPage, this.paging.PageSize, this.searchKey, orderBy, sortDirection)
    console.log(this.dataSource);
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
    })

  }

  fetchBooks(page, pageSize, searchString?, orderBy?, sortDirection?: 'asc' | 'desc'){
    this.bookService.getBooks(page, pageSize, searchString, orderBy, sortDirection).pipe(
      tap(res => this.dataSource = Object.assign([], res.body as  unknown as MatTableDataSource<Book[]>)))
      .subscribe(
        res => (this.setPagemodel(res), this.setSortModel(orderBy, sortDirection))
      );
  }

  

}
