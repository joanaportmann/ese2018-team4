import { Component, OnInit } from '@angular/core';
import {Job} from '../models/job';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  jobs: Job[] = [];
  static searchText = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    SearchComponent.searchText = window.location.pathname.substr(8);
    this.httpClient.get('http://localhost:3000/job').subscribe((instances: any) => {
      this.jobs = instances.map(this.filter);
    });
  }

  filter(job: any): Job {
    if (SearchComponent.containsText(job)) {
      return new Job(job.id, job.name, job.percentage, job.time, job.necessarySkills, job.description, job.info);
    }
    else return null;
  }

  private static containsText(job: any): boolean {
    return job.name.includes(this.searchText);
  }
}
