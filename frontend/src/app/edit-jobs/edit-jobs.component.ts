import { Component, OnInit } from '@angular/core';
import {Job} from '../models/job';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-jobs',
  templateUrl: './edit-jobs.component.html',
  styleUrls: ['./edit-jobs.component.css']
})
export class EditJobsComponent implements OnInit {
  job: Job = new Job(null, '', '', '', null, '','');
  jobs: Job[] = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/job').subscribe((instances: any) => {
      this.jobs = instances.map((instance) =>
        new Job(instance.id, instance.name, instance.description, instance.necessarySkills, instance.percentage, instance.time, instance.info));
    });
  }
  displayJobs(): Observable<Object> {
    return this.httpClient.get('http://localhost:3000/job');
  }
  save(): void {
    this.jobs.push(this.job);
  }
}
