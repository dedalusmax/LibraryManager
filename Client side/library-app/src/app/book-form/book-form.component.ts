import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BookService } from '../shared/book.service';
import { take } from 'rxjs/operators';
import { Book } from '../shared/book.model';
import { MatDialogRef } from '@angular/material/dialog';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    public bookService: BookService, 
    public dialogRef: MatDialogRef<BookFormComponent>) { }

  ngOnInit(): void {

    this.bookForm = this.formBuilder.group({
      title: '',
      author: '',
      publisher: '',
      dateOfPublication: new Date(),
    })

  }

  onSubmit(form: FormGroup) {

    let formWithId: FormGroup;

    this.bookService.createBook(form.value).pipe(take(1))
      .subscribe({next: (book: Book) => this.onClose(book) })
  }

  onClose(book: Book) {
    // if(!form.valid) return;
    this.dialogRef.close(book)
  }


}
