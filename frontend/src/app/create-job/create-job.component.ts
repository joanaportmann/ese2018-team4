import {Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent, MyErrorStateMatcher} from '../app.component';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Job} from '../models/job';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {
  @ViewChild('jobForm')
  public jobForm: NgForm;
  job: Job = new Job(null, '', '', '');
  jobs: Job[] = [];
  jobFormGroup: FormGroup;
  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  descriptionFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  matcher2 = new MyErrorStateMatcher();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get('http://localhost:3000/job').subscribe((instances: any) => {
      this.jobs = instances.map((instance) =>
        new Job(instance.id, instance.name, instance.description, instance.necessarySkills));
    });

    this.jobFormGroup = new FormGroup({
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
        this.jobForm.resetForm();
      });
  }

  onJobDestroy(job: Job): void {
    this.jobs.splice(this.jobs.indexOf(job), 1);
  }

}
