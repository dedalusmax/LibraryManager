import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BookService } from '../shared/book.service';
import { take } from 'rxjs/operators';
import { Book } from '../shared/book.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  lang: string;

  constructor(
    private formBuilder: FormBuilder, 
    public bookService: BookService, 
    public dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.lang = localStorage.getItem('lang');

    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      dateOfPublication: ['', Validators.required]
    });

    console.log(this.data);

    if(this.data) {
      this.bookForm.addControl('id', new FormControl(''));
      this.bookForm.setValue({
                id: this.data.id,
                title: this.data.title,
                author: this.data.author,
                publisher: this.data.publisher,
                dateOfPublication: this.data.dateOfPublication,
              });
    
              console.log(this.bookForm);
    }

  }

  

  onSubmit(form: FormGroup) {

    if(!this.data) {
      this.bookService.createBook(form.value).pipe(take(1))
      .subscribe({next: (book: Book) => this.onClose(book) });
    }
    else {
      this.bookService.updateBook(form.value).pipe(take(1))
      .subscribe({next: (book: Book) => this.onClose(book) });
    }

    form.reset();

  }

  onClose(book: Book) {
    // if(!form.valid) return;
    this.dialogRef.close(book);
  }

  getErrorMessage(element: HTMLElement) {

    switch(this.lang) {

      case 'en':

      switch(element.getAttribute('formControlName')) {

        case 'title':
          if (this.bookForm.controls.title.hasError('required')) {
            return 'Title is required';
          }
          break;

        case 'author':
          if (this.bookForm.controls.author.hasError('required')) {
            return 'Author is required';
          }
          break;
            
        case 'publisher':
          if (this.bookForm.controls.publisher.hasError('required')) {
            return 'Publisher is required';
          }
          break; 

        case 'dateOfPublication':
          if (this.bookForm.controls.dateOfPublication.hasError('required')) {
            return 'Date of publication is required';
          }
          break;
      }
      break;
      
      case 'ru': 

      switch(element.getAttribute('formControlName')) {

        case 'title':
          if (this.bookForm.controls.title.hasError('required')) {
            return 'Требуется название';
          }
          break;

        case 'author':  
          if (this.bookForm.controls.author.hasError('required')) {
            return 'Требуется автор';
          }
          break;

        case 'publisher':  
          if (this.bookForm.controls.publisher.hasError('required')) {
            return 'Требуется публикация';
          }
          break;

        case 'dateOfPublication':  
          if (this.bookForm.controls.dateOfPublication.hasError('required')) {
            return 'Дата публикации обязательна';
          }
          break;
      }
      break;

      case 'hr': 

      switch(element.getAttribute('formControlName')) {

        case 'title':
          if (this.bookForm.controls.title.hasError('required')) {
            return 'Unos naslova je obavezan';
          }
          break;

        case 'author':  
          if (this.bookForm.controls.author.hasError('required')) {
            return 'Unos autora je obavezan';
          }
          break;

        case 'publisher':  
          if (this.bookForm.controls.publisher.hasError('required')) {
            return 'Unos idavača je obavezna';
          }
          break;

        case 'dateOfPublication':  
          if (this.bookForm.controls.dateOfPublication.hasError('required')) {
            return 'Unos datuma izdavanja je obavezan';
          }
          break;
      }
      break;
    
    }
  }
}
