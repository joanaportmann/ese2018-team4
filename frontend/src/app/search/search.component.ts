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
    this.httpClient.get('http://localhost:3000/job').subscribe((instances: any) => {
      this.jobs = instances.map((instance) =>
        new Job(instance.id, instance.name, instance.description, instance.necessarySkills));
    });

    this.searchText = 'a';
    this.jobs = this.filterText();
  }

  filterText(): Job[] {
    if (!this.searchText.trim()) {
      return this.jobs;
    }
    return jobs.filter(this.containsSomewhere);
  }

  private containsSomewhere(element, index, array) {
    return element.includes(this.searchText);
  }
}
