import { Component, HostBinding, Injectable, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Job } from '../models/job';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../services/user.service';
import { getDefaultService } from 'selenium-webdriver/opera';


@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})

export class CreateJobComponent implements OnInit {
  @ViewChild('jobForm')
  public jobForm: NgForm;
  job: Job = new Job(null, '', '', '', null, '', '', false, null);
  jobs: Job[] = [];
  jobFormGroup: FormGroup;

  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar, public userService: UserService) {
  }

  @Output()
  destroy = new EventEmitter<Job>();

  ngOnInit(): void {
    this.httpClient.get('http://localhost:3000/job', { withCredentials: true }).subscribe((instances: any) => {
      this.jobs = instances
        .filter(instance => instance.owner === this.userService.getUser().username) 
        .map((instance) =>
          new Job(instance.id, instance.name, instance.description, instance.necessarySkills, instance.percentage, instance.time, instance.info, instance.approved, instance.owner));
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
    this.httpClient.post('http://localhost:3000/job', this.job, { withCredentials: true })
      .subscribe((instance: any) => {
        this.job.id = instance.id;
        this.jobs.push(this.job);
        this.job = new Job(null, '', '', '', null, '', '', false, null);
        this.jobForm.resetForm();
        this.snackbar.open('Your Job will be displayed as soon as it is approved by an admin');
      });
  }



  /**
   * reset current data inputs so that the fields are empty again
   */
  resetForm(): void {
    this.jobForm.reset();

  }


  onDestroy(job: Job) {
    this.httpClient.delete('http://localhost:3000/job/' + job.id, { withCredentials: true }).subscribe(() => {
      this.destroy.emit(this.job);
      this.jobs.splice(this.jobs.indexOf(job), 1);
    });
  }

}
