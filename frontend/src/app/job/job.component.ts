
import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {Job} from '../models/job';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';

//import {User} from './models/user';

import {ActivatedRoute} from '@angular/router';



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

  constructor(
    private httpClient: HttpClient,
    public userService: UserService,
    fb: FormBuilder,
    private route: ActivatedRoute
  ) {
   this.options = fb.group({approved: false});

   const id = +this.route.snapshot.paramMap.get('id');
   this.job = this.getJob(id);
  }

  private getJob(id: number): Job {
    return null;
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

enum UserType {
  admin = 'admin',
  enterprise = 'enterprise'
}
