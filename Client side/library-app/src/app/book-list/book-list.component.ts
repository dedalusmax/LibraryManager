import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../shared/book.service';
import { tap, take } from 'rxjs/operators';
import { Book } from '../shared/book.model';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  dataSource: Book [];
  displayedColumns: string[] = ['title', 'author', 'publisher', 'dateOfPublication', 'actions'];

  @ViewChild(MatTable, {static: false}) table: MatTable<Book>;

  constructor(private bookService: BookService, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks(){
    this.bookService.getBooks().pipe(
      take(1)).subscribe(res => this.dataSource = Object.assign([], res));
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

  

}
