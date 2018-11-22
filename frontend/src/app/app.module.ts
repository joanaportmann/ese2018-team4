import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

// Add css components from angular material
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatListModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatDialogModule,
  MatStepperModule,
  MatToolbar,
  MatToolbarModule,
  MatMenuModule, MatIconModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule
} from '@angular/material';
import { JobComponent } from './job/job.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogComponent} from './dialog/dialog.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { ProfilePanelComponent } from './profile-panel/profile-panel.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { AvailableJobsComponent } from './available-jobs/available-jobs.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { AdminViewComponent } from './admin-view/admin-view.component';


@NgModule({
  declarations: [
    AppComponent,
    JobComponent,
    LoginComponent,
    DialogComponent,
    CreateJobComponent,
    RegisterDialogComponent,
    ProfilePanelComponent,
    ProfileEditorComponent,
    AvailableJobsComponent,
    MyJobsComponent,
    AdminViewComponent
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
    MatDatepickerModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatNativeDateModule
  ],
  entryComponents: [
    DialogComponent,
    RegisterDialogComponent,
    ProfilePanelComponent,
    LoginComponent
  ],
  providers: [AppComponent, ProfileEditorComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
