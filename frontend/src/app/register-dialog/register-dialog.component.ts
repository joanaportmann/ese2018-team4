import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorStateMatcher, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Credentials } from '../models/credentials';
import { UserService } from '../services/user.service';
import { Person } from '../models/user';


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
  PasswordConfirmationMatcher: GroupErrorStateMatcher = new GroupErrorStateMatcher();
  emailFormControl = new FormControl('', [
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar, private _formBuilder: FormBuilder,
    public dialog: MatDialog, private dialogReg: MatDialogRef<RegisterDialogComponent>) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmedPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
    this.secondFormGroup = this._formBuilder.group({
      companyName: [''],
      email: [''],
      phoneNumber: [''],
      homepage: [''],
      address: [''],
      numberOfEmployees: [''],
      business: ['']
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmedPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  /**
   * more or less the same function as the login() function
   */
  register() {
    const firstFormValue = this.firstFormGroup.value;
    const secondFormValue = this.secondFormGroup.value;
    const user = new RegistrationInfo(firstFormValue.username, firstFormValue.password, secondFormValue.companyName,
      secondFormValue.email, secondFormValue.phoneNumber, secondFormValue.homepage, secondFormValue.address,
      secondFormValue.numberOfEmployees, secondFormValue.business);
    this.httpClient.post('http://localhost:3000/user', user, {
      responseType: 'text',
      withCredentials: true
    }).subscribe((responseText: string) => {
      this.snackBar.open('You are now registered! Please log yourself in.');
      this.dialogReg.close();
    }, (error: HttpErrorResponse) => {
      this.snackBar.open('Username already taken');
    });
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class GroupErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

export class RegistrationInfo implements Person {
  constructor(
    public username: string,
    public password: string,
    public companyName: string,
    public email: string,
    public phoneNumber: string,
    public homepage: string,
    public address: string,
    public numberOfEmployees: string,
    public business: string
  ) { }
}

