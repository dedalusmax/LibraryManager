import { Component, OnInit, EventEmitter, Output, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BookService } from '../shared/book.service';
import { take } from 'rxjs/operators';
import { Book } from '../shared/book.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;

  editMode = false;

  editSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder, 
    public bookService: BookService, 
    public dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.bookForm = this.formBuilder.group({
      title: '',
      author: '',
      publisher: '',
      dateOfPublication: new Date(),
    })

    console.log(this.data)

    if(this.data) {
      this.bookForm.addControl('id', new FormControl(''));
      this.bookForm.setValue({
                id: this.data.id,
                title: this.data.title,
                author: this.data.author,
                publisher: this.data.publisher,
                dateOfPublication: this.data.dateOfPublication
              })
    
              console.log(this.bookForm);
    }

    // this.editSubscription = this.bookService.startedEditing
    //   .subscribe(
    //     (book: Book) => {
    //       this.editMode = true;

          
    //       this.bookForm.setValue({
    //         id: book.id,
    //         title: book.title,
    //         author: book.author,
    //         dateOfBirth: book.dateOfPublication
    //       })

    //       console.log(this.bookForm);
    //     }
    //   );

    

  }

  

  onSubmit(form: FormGroup) {

    if(!this.data) {
      this.bookService.createBook(form.value).pipe(take(1))
      .subscribe({next: (book: Book) => this.onClose(book) })
    }
    else {
      this.bookService.updateBook(form.value).pipe(take(1))
      .subscribe({next: (book: Book) => this.onClose(book) })
    }

    form.reset()

  }

  onClose(book: Book) {
    // if(!form.valid) return;
    this.dialogRef.close(book)
  }


}
