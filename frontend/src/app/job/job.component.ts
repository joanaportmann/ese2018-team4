
import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {Job} from '../models/job';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ViewEncapsulation } from '@angular/core';

//import {User} from './models/user';

import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})

export class JobComponent {

  @Input()
  job: Job;

  @Input()
  showDestroyButton: Boolean;

  @Input()
  editable: Boolean = false;

  @Output()
  destroy = new EventEmitter<Job>();

  options: FormGroup;
  encapsulation: ViewEncapsulation.None;
  checked = false;

  constructor(
    private httpClient: HttpClient,
    public userService: UserService,
    fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    public snackbar: MatSnackBar
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
    this.snackbar.open('Changes saved!');
    if (this.checked = true) {
      this.httpClient.put('http://localhost:3000/job/id/approved/' + true, this.job).subscribe();
    }
  }

  onDestroy() {
    this.httpClient.delete('http://localhost:3000/job/' + this.job.id, { withCredentials: true }).subscribe(() => {
      this.destroy.emit(this.job);
    });
  }

  onApprove() {
    this.checked = true;
  }
}

enum UserType {
  admin = 'admin',
  enterprise = 'enterprise'
}
