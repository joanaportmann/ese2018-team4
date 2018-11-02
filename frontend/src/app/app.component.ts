import {Component, OnInit} from '@angular/core';
import {Job} from './models/job';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  job: Job = new Job(null, '', '', '');
  jobs: Job[] = [];
  // Validators

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  descriptionFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();
  jobForm: FormGroup;
  matcher2 = new MyErrorStateMatcher();

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.httpClient.get('http://localhost:3000/job').subscribe((instances: any) => {
      this.jobs = instances.map((instance) =>
        new Job(instance.id, instance.name, instance.description, instance.necessarySkills));
    });

    this.jobForm = new FormGroup({
      nameFormControl: new FormControl(this.job.name, [Validators.required]),
      descriptionFormControl: new FormControl(this.job.description, [Validators.required])
    });
  }

  onJobCreate(): void {
    this.httpClient.post('http://localhost:3000/job', this.job)
      .subscribe((instance: any) => {
        this.job.id = instance.id;
        this.jobs.push(this.job);
        this.job = new Job(null, '', '', '');
      });
  }

  onJobDestroy(job: Job): void {
    this.jobs.splice(this.jobs.indexOf(job), 1);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('this dialog is closed');
    });
  }
}
  export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }



