
import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {Job} from '../models/job';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})

export class JobComponent {

  @Input()
  job: Job;

  @Output()
  destroy = new EventEmitter<Job>();

  options: FormGroup;

  constructor(private httpClient: HttpClient, public userService: UserService, fb: FormBuilder) {
   this.options = fb.group({approved: false});
  }

  onSave() {
    this.httpClient.put('http://localhost:3000/job/' + this.job.id, this.job).subscribe();
  }

  onDestroy() {
    this.httpClient.delete('http://localhost:3000/job/' + this.job.id, { withCredentials: true }).subscribe(() => {
      this.destroy.emit(this.job);
    });
  }

}
