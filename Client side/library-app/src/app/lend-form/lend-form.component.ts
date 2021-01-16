import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {

    this.lang = localStorage.getItem('lang');

    this.lendForm = this.formBuilder.group({
      cardNumber: ['', Validators.required]
    });

  }

  onSubmit(form: FormGroup) {

    this.onClose(form.value.cardNumber);
    form.reset();

  }

  onClose(cardNumber: string) {
    // if(!form.valid) return;
    this.dialogRef.close(cardNumber);
  }
}
