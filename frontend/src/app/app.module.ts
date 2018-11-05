import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

// Add css components from angular material
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule,
  MatListModule, MatExpansionModule, MatSnackBarModule, MatDialogModule
} from '@angular/material';
import { JobComponent } from './job/job.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogComponent} from './dialog/dialog.component';
import { CreateJobComponent } from './create-job/create-job.component';


@NgModule({
  declarations: [
    AppComponent,
    JobComponent,
    LoginComponent,
    DialogComponent,
    CreateJobComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
