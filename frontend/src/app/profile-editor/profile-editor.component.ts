import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialog, MatDialogRef, NativeDateAdapter, MatSnackBar } from '@angular/material';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { LoginComponent } from '../login/login.component';
import { DeleteAccountComponent } from "../delete-account/delete-account.component";
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {

  public user: User;

  constructor(public dialog: MatDialog, private userService: UserService, private httpClient: HttpClient, public snackBar: MatSnackBar) {
    this.user = userService.getUser();
  }

  emailFormControl = new FormControl('', [
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  submitChanges() {
    this.httpClient.put(`http://localhost:3000/user/${this.user.username}`, this.user).subscribe(() => {
      this.snackBar.open('Your account is updated');
    });
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
