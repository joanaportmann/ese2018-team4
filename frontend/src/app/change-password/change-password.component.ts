import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Credentials } from '../models/credentials';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  credentials = new Credentials('', '');
  newPassword: string;
  confirmPassword: string;

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar, private _formBuilder: FormBuilder,
    public dialog: MatDialog, private dialogChangePassword: MatDialogRef<ChangePasswordComponent>) { }

  @Input()
  user: User;

  changePassword() {
    this.httpClient.put(`http://localhost:3000/user/${this.user.username}/password`, this.newPassword, {
      withCredentials: true
    }).subscribe(() => {
      this.snackBar.open('Your password has been changed');
    });
    this.dialogChangePassword.close();
  }

  cancel() {
    this.dialogChangePassword.close();
  }
}
