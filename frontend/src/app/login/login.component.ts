import {Component, Inject} from '@angular/core';
import { Credentials } from '../models/credentials';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {RegisterDialogComponent} from '../register-dialog/register-dialog.component';
import {ProfilePanelComponent} from '../profile-panel/profile-panel.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = new Credentials('', '');
  profilePanel = new ProfilePanelComponent();

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar,
              public dialog: MatDialog) {}
  login() {

    this.httpClient.post('http://localhost:3000/login', this.credentials, {
      responseType: 'text',
      withCredentials: true
    }).subscribe((responseText: string) => {
      this.profilePanel.loggedIn = true;
       this.snackBar.open('Welcome, ' + this.credentials.username);
    }, (error: HttpErrorResponse) => {
      this.snackBar.open('Login failed');
    });

  }

  /**
   * open the register pop-up window
   */
  openDialogRegister() {
    const openDialogReg = this.dialog.open(RegisterDialogComponent);

    openDialogReg.afterClosed().subscribe( result => {
      console.log('Dialog to Register is closed');
    });
  }

}
