import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Job} from '../models/job';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-jobs',
  templateUrl: './edit-jobs.component.html',
  styleUrls: ['./edit-jobs.component.css']
})
export class EditJobsComponent implements OnInit {
  job: Job = new Job(null, '', '', '', null, '','', false, '');
  jobs: Job[] = [];
  checked = false;
  constructor(private httpClient: HttpClient, public userService: UserService) { }


  ngOnInit() {
    this.httpClient.get('http://localhost:3000/job').subscribe((instances: any) => {
      this.jobs = instances.map((instance) =>
        new Job(instance.id, instance.name, instance.description, instance.necessarySkills, instance.percentage, instance.time, instance.info, instance.approved, instance.owner));
    });
  }
  displayJobs(): Observable<Object> {
    return this.httpClient.get('http://localhost:3000/job');
  }
  save(): void {
    this.jobs.push(this.job);
  }

  approve(job: Job): void {
    this.httpClient.put(`http://localhost:3000/job/${job.id}/approved`, job.approved.toString()).subscribe();
  }

}
