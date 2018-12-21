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
  MatMenuModule,
  MatIconModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatGridListModule,
  MatSliderModule
  MatGridListModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
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
import { SearchComponent } from './search/search.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { LogoutComponent } from './logout/logout.component';
import { EditJobsComponent } from './edit-jobs/edit-jobs.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AppRoutingModule } from './/app-routing.module';
import { DemandComponent } from './demand/demand.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SalaryCalculatorComponent } from './salary-calculator/salary-calculator.component';
import { CareerTippsComponent } from './career-tipps/career-tipps.component';


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
    SearchComponent,
    SearchBarComponent,
    MyJobsComponent,
    AdminViewComponent,
    DeleteAccountComponent,
    LogoutComponent,
    EditJobsComponent,
    EditUserComponent,
    DemandComponent,
    AboutUsComponent,
    SalaryCalculatorComponent,
    CareerTippsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSliderModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatNativeDateModule,
    AppRoutingModule
  ],
  entryComponents: [
    DialogComponent,
    RegisterDialogComponent,
    ProfilePanelComponent,
    LoginComponent,
    ProfileEditorComponent,
    DeleteAccountComponent
  ],
  providers: [AppComponent, ProfileEditorComponent, {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
