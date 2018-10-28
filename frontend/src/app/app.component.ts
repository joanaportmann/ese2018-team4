import {Component, OnInit} from '@angular/core';
import {Job} from './models/job';
import {HttpClient} from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  job: Job = new Job(null, '', '', '');
  jobs: Job[] = [];
  Validators

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/job').subscribe((instances: any) => {
      this.jobs = instances.map((instance) =>
          new Job(instance.id, instance.name, instance.description, instance.necessarySkills));
    });
  }

  onJobCreate() {
    this.httpClient.post('http://localhost:3000/job', this.job)
      .subscribe((instance: any) => {
        this.job.id = instance.id;
        this.jobs.push(this.job);
        this.job = new Job(null, '', '', '');
      });
      
  }

  onJobDestroy(job: Job) {
    this.jobs.splice(this.jobs.indexOf(job), 1);
  }
}
