import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, timer } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, take, tap, toArray } from 'rxjs/operators';
import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  public customerForm: FormGroup;
  public lang: string;

  constructor(
    private formBuilder: FormBuilder, 
    public customerService: CustomerService, 
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.lang = localStorage.getItem('lang');

    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      cardNumber: ['', Validators.required, this.data ? null : this.existedCardNumber.bind(this)]
    });

    console.log(this.data);

    if(this.data) {
      this.customerForm.addControl('id', new FormControl(''));
      this.customerForm.setValue({
                id: this.data.id,
                firstName: this.data.firstName,
                lastName: this.data.lastName,
                email: this.data.email,
                cardNumber: this.data.cardNumber,
              });
    
              console.log(this.customerForm);
    }
  }

  public existedCardNumber(control: AbstractControl): Promise<any> | Observable<any> {

    return timer(1500).pipe(
      switchMap( () => {
        return this.customerService.getCustomerByCrdNumber(control.value).pipe(
          catchError( async (err) => console.log(err)),
          tap( res => console.log(res)),
          map( (resp: Customer) => resp ? { numberExisting: true } : null));
      })
    );
  }

  public onSubmit(form: FormGroup): void {

    if(!this.data) {
      this.customerService.createCustomer(form.value).pipe(take(1))
      .subscribe({next: (customer: Customer) => this.onClose(customer) });
    }
    else {
      this.customerService.updateCustomer(form.value).pipe(take(1))
      .subscribe({next: (customer: Customer) => this.onClose(customer) });
    }

    form.reset();

  }

  public onClose(customer: Customer): void {
    // if(!form.valid) return;
    this.dialogRef.close(customer);
  }

  public getErrorMessage(element: HTMLElement): string {

    switch(this.lang) {

      case 'en':

      switch(element.getAttribute('formControlName')) {

        case 'firstName':
          if (this.customerForm.controls.firstName.hasError('required')) {
            return 'First name is required';
          }
          break;

        case 'lastName':
          if (this.customerForm.controls.lastName.hasError('required')) {
            return 'Last name is required';
          }
          break;
            
        case 'email':
          if (this.customerForm.controls.email.hasError('required')) {
            return 'Email is required';
          }
          break; 

        case 'cardNumber':
          if (this.customerForm.controls.cardNumber.hasError('required')) {
            return 'Card number is required';
          }
          break;
      }
      break;
      
      // case 'ru': 

      // switch(element.getAttribute('formControlName')) {

      //   case 'title':
      //     if (this.bookForm.controls.title.hasError('required')) {
      //       return '?????????????????? ????????????????';
      //     }
      //     break;

      //   case 'author':  
      //     if (this.bookForm.controls.author.hasError('required')) {
      //       return '?????????????????? ??????????';
      //     }
      //     break;

      //   case 'publisher':  
      //     if (this.bookForm.controls.publisher.hasError('required')) {
      //       return '?????????????????? ????????????????????';
      //     }
      //     break;

      //   case 'dateOfPublication':  
      //     if (this.bookForm.controls.dateOfPublication.hasError('required')) {
      //       return '???????? ???????????????????? ??????????????????????';
      //     }
      //     break;
      // }
      // break;

      // case 'hr': 

      // switch(element.getAttribute('formControlName')) {

      //   case 'title':
      //     if (this.bookForm.controls.title.hasError('required')) {
      //       return 'Unos naslova je obavezan';
      //     }
      //     break;

      //   case 'author':  
      //     if (this.bookForm.controls.author.hasError('required')) {
      //       return 'Unos autora je obavezan';
      //     }
      //     break;

      //   case 'publisher':  
      //     if (this.bookForm.controls.publisher.hasError('required')) {
      //       return 'Unos idava??a je obavezna';
      //     }
      //     break;

      //   case 'dateOfPublication':  
      //     if (this.bookForm.controls.dateOfPublication.hasError('required')) {
      //       return 'Unos datuma izdavanja je obavezan';
      //     }
      //     break;
      // }
      // break;
    
    }
  }
}



