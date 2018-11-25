import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialog, MatSnackBar } from '@angular/material';
import { DeleteAccountComponent } from "../delete-account/delete-account.component";
import { User } from '../models/user';
import { UserService } from '../services/user.service';


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
    this.httpClient.put(`http://localhost:3000/user/${this.user.username}`, this.user, {
      withCredentials: true
    }).subscribe(() => {
      this.snackBar.open('Your account is updated');
    });
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(DeleteAccountComponent);
    dialogRef.componentInstance.user = this.userService.getUser();

    dialogRef.afterClosed().subscribe( result => {
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
