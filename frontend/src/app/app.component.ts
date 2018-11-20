import { Component, OnInit, ViewChild } from '@angular/core';
import { Job } from './models/job';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import {RegisterDialogComponent} from './register-dialog/register-dialog.component';
import {ProfilePanelComponent} from './profile-panel/profile-panel.component';
import { UserService } from './services/user.service';
import {NativeDateAdapter} from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('jobForm')
  public jobForm: NgForm;
  job: Job = new Job(null, '', '', '');
  jobs: Job[] = [];
  onHomeClicked = false;


  constructor(private httpClient: HttpClient, public dialog: MatDialog, public userService: UserService) {
  }

  openJobs() {
    this.onHomeClicked = !this.onHomeClicked;
  }

  /**
   * open the log-In popUp-window
   */
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('this dialog is closed');
    });
  }


  onJobCreate(): void {
    this.httpClient.post('http://localhost:3000/job', this.job, { withCredentials: true })
      .subscribe((instance: any) => {
        this.job.id = instance.id;
        this.jobs.push(this.job);
        this.job = new Job(null, '', '', '');
      });

  }

  onJobDestroy(job: Job): void {
    this.jobs.splice(this.jobs.indexOf(job), 1);
  }

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



