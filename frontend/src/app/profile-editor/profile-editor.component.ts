import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatDialog, MatDialogRef, NativeDateAdapter} from '@angular/material';
import {RegisterDialogComponent} from '../register-dialog/register-dialog.component';
import {LoginComponent} from '../login/login.component';
import {DeleteAccountComponent} from "../delete-account/delete-account.component";


export interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  constructor(public dialog: MatDialog) {
  }

  emailFormControl = new FormControl('', [
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  genders: Gender[] = [
    {value: 'female-0', viewValue: 'Female'},
    {value: 'male-1', viewValue: 'Male'},
    {value: 'Other-2', viewValue: 'Other'}
  ];

  deleteAccount() {
    const openDialogDel = this.dialog.open(DeleteAccountComponent);

    openDialogDel.afterClosed().subscribe( result => {
      console.log('Dialog to Delete Account is closed');
  });
}
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
