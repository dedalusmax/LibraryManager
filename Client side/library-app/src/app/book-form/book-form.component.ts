import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public bookService: BookService) { }

  ngOnInit(): void {

    this.bookForm = this.formBuilder.group({
      title: '',
      author: '',
      publisher: '',
      dateOfPublication: new Date(),
    })

  }

}
