import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, pipe, timer } from 'rxjs';
import {  catchError, debounceTime, filter, map, mergeMap, switchMap, take, tap, toArray } from 'rxjs/operators';
import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';
import { LendService } from '../shared/lend.service';

@Component({
  selector: 'app-lend-form',
  templateUrl: './lend-form.component.html',
  styleUrls: ['./lend-form.component.scss']
})
export class LendFormComponent implements OnInit {

  lendForm: FormGroup;
  lang: string;

  constructor(
    private formBuilder: FormBuilder, 
    public lendService: LendService, 
    public dialogRef: MatDialogRef<LendFormComponent>,
    public customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {

    this.lang = localStorage.getItem('lang');
    
    this.lendForm = this.formBuilder.group({
      cardNumber: ['', Validators.required, this.nonExistedCardNumber.bind(this)]
    });

  }

  nonExistedCardNumber(control: AbstractControl): Promise<any> | Observable<any> {

    return timer(1500).pipe(
      switchMap( () => {
        return this.customerService.getCustomers().pipe(
          map(resp => resp.body as Customer[]),
           mergeMap( array => [...array]),
            filter( customer => customer.cardNumber == control.value),
            toArray(),
            tap( res => console.log(res)),
            map( arr => arr.length ? null : { numberNonExisting: true }));
      })
    );
  }
    
  onSubmit(form: FormGroup) {
    this.onClose(form.value.cardNumber);
    form.reset();
  }

  onClose(cardNumber: string) {
    // if(!form.valid) return;
    this.dialogRef.close(cardNumber);
  }

  getErrorMessage(elementCardNumber) {
    return 'Card number is required';
  }
}
