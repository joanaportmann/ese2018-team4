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
  searchText = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.jobs = this.httpClient.get('http://localhost:3000/job');

    this.searchText = 'a';
    this.jobs = this.filterText();

    this.jobs.subscribe((instances: any) => {
      this.jobs = instances.map((instance) =>
        new Job(instance.id, instance.name, instance.description, instance.necessarySkills));
    });
  }

  filterText(): Job[] {
    if (!this.searchText.trim()) {
      return this.jobs;
    }
    return this.jobs.filter(job => true);
  }
}
