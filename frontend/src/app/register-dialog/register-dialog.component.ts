import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ErrorStateMatcher, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Credentials} from '../models/credentials';


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})

export class RegisterDialogComponent implements OnInit {
  credentials = new Credentials('', '');
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar, private _formBuilder: FormBuilder,
              public dialog: MatDialog, private dialogReg: MatDialogRef<RegisterDialogComponent>) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      first: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      second: ['', Validators.required]
    });
  }

  /**
   * more or less the same function as the login() function
   */
  register() {
    this.httpClient.post('http://localhost:3000/user', this.credentials, {
      responseType: 'text',
      withCredentials: true
    }).subscribe((responseText: string) => {
      this.snackBar.open('You are now registered! Please log yourself in.');
      this.dialogReg.close();
    }, (error: HttpErrorResponse) => {
      this.snackBar.open('Registration failed');
    });
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
