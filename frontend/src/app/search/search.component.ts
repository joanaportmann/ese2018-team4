import { Component, OnInit } from '@angular/core';
import {Job} from '../models/job';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  jobs: Job[] = [];
  static searchText = '';

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    SearchComponent.searchText = +this.route.snapshot.paramMap.get('text');
    this.httpClient.get('http://localhost:3000/job').subscribe((instances: any) => {
      this.jobs = instances.map(this.filter);
    });
  }

  filter(job: any): Job {
    if (SearchComponent.containsText(job)) {
      return new Job(job.id, job.name, job.percentage, job.time, job.necessarySkills, job.description);
    }
    else return null;
  }

  private static containsText(job: any): boolean {
    return job.name.includes(this.searchText);
  }
}