import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../shared/book.model';

@Component({
  selector: 'app-customer-lends-list',
  templateUrl: './customer-lends-list.component.html',
  styleUrls: ['./customer-lends-list.component.scss']
})
export class CustomerLendsListComponent implements OnInit {

  dataSource: Book [];
  displayedColumns: string[] = ['title', 'author', 'publisher', 'dateOfPublication'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    if(this.data) {
      this.dataSource = this.data.lendedBooks;
    }
  }

}
