import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Credentials } from '../models/credentials';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {

  credentials = new Credentials('', '');

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar, private _formBuilder: FormBuilder,
    public dialog: MatDialog, private dialogDel: MatDialogRef<DeleteAccountComponent>) { }

  @Input()
  user: User;

  @Output()
  destroy = new EventEmitter<User>();

  onNoClick() {
    this.dialogDel.close();
  }

  onYesClick() {
    this.httpClient.delete('http://localhost:3000/user/' + this.user.username, { withCredentials: true }).subscribe(() => {
      this.destroy.emit(this.user);
      this.dialogDel.close();
      this.snackBar.open('Your account has been deleted');
    });

  }


}
