import {Component, HostBinding, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Job} from "../models/job";
import {Router} from "@angular/router";


@Component({
  selector: 'app-available-jobs',
  templateUrl: './available-jobs.component.html',
  styleUrls: ['./available-jobs.component.css']
})
export class AvailableJobsComponent implements OnInit {

  

  job: Job = new Job(null, '', '', '', null, '', '', false, '');
  jobs: Job[] = [];

  constructor(private httpClient: HttpClient, public router: Router) { }

  @HostBinding('class.is-open') @Input()
  isOpen = false;

  ngOnInit() {
  this.httpClient.get('http://localhost:3000/job/').subscribe((instances: any) => {
  this.jobs = instances
      .filter((instance) => instance.approved)
      .map((instance) =>
    new Job(instance.id, instance.name, instance.description, instance.necessarySkills, instance.percentage, instance.time, instance.info, instance.approved, instance.owner));
});
}


}
