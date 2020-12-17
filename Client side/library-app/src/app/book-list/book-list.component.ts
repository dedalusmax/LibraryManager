import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../shared/book.service';
import { tap, take } from 'rxjs/operators';
import { Book } from '../shared/book.model';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component';
import { Paging } from './paging.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  dataSource: Book [];
  displayedColumns: string[] = ['title', 'author', 'publisher', 'dateOfPublication', 'actions'];

  paging = new Paging();

  @ViewChild(MatTable, {static: false}) table: MatTable<Book>;

  constructor(private bookService: BookService, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchBooks(this.paging.CurrentPage, this.paging.PageSize);
  }

  fetchBooks(page, pageSize){
    this.bookService.getBooks(page, pageSize).pipe(
      tap(res => this.dataSource = Object.assign([], res.body as  unknown as MatTableDataSource<Book[]>)))
      .subscribe(
        res => (this.setPagemodel(res))
      );
  }

  addBook() {
    let dialogRef = this.dialog.open(BookFormComponent);
    
    dialogRef.afterClosed().pipe(take(1))
      .subscribe((book: Book) => {

        console.log(book);

        if(!book) return;

        this.dataSource.push(book);
        this.table.renderRows();
      })
  }

  onDelete(id: string) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(book => book.id !== id)})
  }

  onPageChange(page: PageEvent) {
    this.fetchBooks(page.pageIndex + 1, page.pageSize)
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

  

}
