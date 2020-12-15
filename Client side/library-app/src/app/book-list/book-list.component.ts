import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { tap } from 'rxjs/operators';
import { Book } from '../shared/book.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  dataSource: Book [];
  displayedColumns: string[] = ['title', 'author', 'publisher', 'dateOfPublication'];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks(){
    this.bookService.getBooks().subscribe(res => this.dataSource = Object.assign([], res));
    
  }

}
