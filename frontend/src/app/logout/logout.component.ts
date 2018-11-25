import { Component, Inject } from '@angular/core';
import { Credentials } from '../models/credentials';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  credentials = new Credentials('', '');
  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  logout() {
    this.httpClient.post('http://localhost:3000/logout', this.credentials, {
      responseType: 'text',
      withCredentials: true
    }).subscribe((responseText: string) => {
      console.log('logged out');

      this.snackBar.open('You are now logged out');
    }, (error: HttpErrorResponse) => {
      this.snackBar.open('Logout failed');
    });
  }

}
