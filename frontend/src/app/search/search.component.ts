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

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.searchText = window.location.pathname.substr(8);
    this.httpClient.get('http://localhost:3000/job/').subscribe((instances: any) => {
      this.jobs = instances
        .filter((instance) => instance.approved)
        .filter(
              (instance) => instance.name.toLowerCase().includes(this.searchText.toLowerCase())
              || instance.description.toLowerCase().includes(this.searchText.toLowerCase())
              || instance.necessarySkills.toLowerCase().includes(this.searchText.toLowerCase())
              || instance.time.toLowerCase().includes(this.searchText.toLowerCase())
        )
        .map((instance) =>
          new Job(instance.id, instance.name, instance.description, instance.necessarySkills, instance.percentage, instance.time, instance.info, instance.approved, instance.owner));
    });
  }
}
