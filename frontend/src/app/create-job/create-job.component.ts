import {Component, HostBinding, Injectable, OnInit, ViewChild} from '@angular/core';
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

  /**
   * post the input data from a 'Job-Creation' to backend, set and Id and
   * reset the whole form
   */
  onJobCreate(): void {
    this.httpClient.post('http://localhost:3000/job', this.job, {withCredentials: true})
      .subscribe((instance: any) => {
        this.job.id = instance.id;
        this.jobs.push(this.job);
        this.job = new Job(null, '', '', '');
        this.jobForm.resetForm();
      });
  }

  /**
   * delete created jobs so that they are also deleted from the database
   * @param job
   */
  onJobDestroy(job: Job): void {
    this.jobs.splice(this.jobs.indexOf(job), 1);
  }

  /**
   * reset current data inputs so that the fields are empty again
   */
  resetForm(): void {
    this.jobForm.reset();

  }

}
