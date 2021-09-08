import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, timer } from 'rxjs';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';
import { LendService } from '../shared/lend.service';

@Component({
  selector: 'app-lend-form',
  templateUrl: './lend-form.component.html',
  styleUrls: ['./lend-form.component.scss']
})
export class LendFormComponent implements OnInit {

  public lendForm: FormGroup;
  public lang: string;

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

  public nonExistedCardNumber(control: AbstractControl): Promise<any> | Observable<any> {

    return timer(1500).pipe(
      switchMap( () => {
        return this.customerService.getCustomerByCrdNumber(control.value).pipe(
          catchError( async (err) => console.log(err)),
          tap( res => console.log(res)),
          map( (resp: Customer) => resp ? null : { numberNonExisting: true }));
      })
    );
  }
    
  public onSubmit(form: FormGroup): void {
    this.onClose(form.value.cardNumber);
    form.reset();
  }

  public onClose(cardNumber: string): void {
    // if(!form.valid) return;
    this.dialogRef.close(cardNumber);
  }

  public getErrorMessage(): string {
    return 'Card number is required';
  }
}
