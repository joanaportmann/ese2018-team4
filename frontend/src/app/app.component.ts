import { Component, OnInit, ViewChild } from '@angular/core';
import { Job } from './models/job';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { UserService } from './services/user.service';
import {User} from './models/user';
import { Router, PRIMARY_OUTLET } from '@angular/router';
import {RegisterDialogComponent} from './register-dialog/register-dialog.component';
import { ChangePasswordComponent } from "./change-password/change-password.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('jobForm')
  public jobForm: NgForm;
  job: Job = new Job(null, '', '', '', null, '', '', false, '');
  jobs: Job[] = [];
  onAboutUs = false;
  openJobCreationField: boolean;
  openProfileField: boolean;
  openEditJobs: boolean;
  openEditUser: boolean;
  UserType = UserType;

  constructor(private httpClient: HttpClient,
    public dialog: MatDialog,
    public userService: UserService,
    public router: Router) {
  }

  /**
   * open the log-In popUp-window
   */
  openDialog() {
    this.dialog.open(DialogComponent);
  }

  /**
   * open the register popUp-window and the log-In popUp-window in the background
   * (to log in directly after registration)
   */
  openRegister() {
    this.openDialog();
    this.dialog.open(RegisterDialogComponent);
  }


  openJobs() {
    this.onAboutUs = false;
    this.openJobCreationField = false;
    this.openProfileField = false;
    this.openEditJobs = false;
    this.openEditUser = false;
  }

aboutUs() {
    this.onAboutUs = true;
    this.openProfileField = false;
    this.openJobCreationField = false;
    this.openEditUser = false;
    this.openEditJobs = false;
}

  onJobCreate(): void {
    this.httpClient.post('http://localhost:3000/job', this.job, { withCredentials: true })
      .subscribe((instance: any) => {
        this.job.id = instance.id;
        this.jobs.push(this.job);
        this.job = new Job(null, '', '', '', null, '', '', false, '');
      });

  }

  onJobDestroy(job: Job): void {
    this.jobs.splice(this.jobs.indexOf(job), 1);
  }

  openCreateJob() {
    this.openJobCreationField = true;
    this.openProfileField = false;
    this.onAboutUs = false;
    this.openEditJobs = false;
    this.openEditUser = false;
  }

  openProfile() {
    this.openProfileField = true;
    this.openJobCreationField = false;
    this.onAboutUs = false;
  }

  openEditUsers() {
    this.openEditJobs = false;
    this.onAboutUs = false;
    this.openEditUser = true;
    this.openJobCreationField = false;
    this.openProfileField = false;
  }

  openEditJob() {
    this.openEditUser = false;
    this.onAboutUs = false;
    this.openEditJobs = true;
    this.openJobCreationField = false;
    this.openProfileField = false;
  }
  getUsername(): string {
    const user: User = this.userService.getUser();
    return user && user.username;
  }

  currentPageName(): string {
    const url = this.router.url;
    const rootPart = this.router.parseUrl(url).root;
    if (!rootPart.hasChildren()) { return ''; }
    const firstSegment = rootPart.children[PRIMARY_OUTLET].segments[0];
    return firstSegment ? firstSegment.path : '';
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);
    dialogRef.componentInstance.user = this.userService.getUser();

    dialogRef.afterClosed().subscribe(result => {
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

enum UserType {
  admin = 'admin',
  enterprise = 'enterprise'
}

