import { Component } from '@angular/core';
import { Credentials } from '../models/credentials';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = new Credentials('', '');

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar) {

  }

  login() {
    this.httpClient.post('http://localhost:3000/login', this.credentials, {
      responseType: 'text',
      withCredentials: true
    }).subscribe((responseText: string) => {
       this.snackBar.open('Login successful, message: ' + responseText);
    }, (error: HttpErrorResponse) => {
      this.snackBar.open('Login failed');
    });

  }

}
