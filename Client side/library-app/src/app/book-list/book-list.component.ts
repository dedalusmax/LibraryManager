import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { tap, take } from 'rxjs/operators';
import { Book } from '../shared/book.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  dataSource: Book [];
  displayedColumns: string[] = ['title', 'author', 'publisher', 'dateOfPublication'];

  constructor(private bookService: BookService, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks(){
    this.bookService.getBooks().pipe(
      take(1)).subscribe(res => this.dataSource = Object.assign([], res));
  }

  openDialog() {
    this.dialog.open(BookFormComponent);
  }

}
