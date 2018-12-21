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
  percentage = 100;
  skills = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.interpret(window.location.pathname.substr(8));

    this.httpClient.get('http://localhost:3000/job/').subscribe((instances: any) => {
      this.jobs = instances
        .filter((instance) => instance.approved)
        .filter((instance) => this.textFilter(instance))
        .filter((instance) => this.percentageFilter(instance))
        .filter((instance) => this.skillsFilter(instance))
        .map((instance) =>
          new Job(instance.id, instance.name, instance.description, instance.necessarySkills, instance.percentage, instance.time, instance.info, instance.approved, instance.owner));
    });
  }

  private interpret(input: String) {
    var filters = input.split('&');

    for (let filter of filters) {
      var expression = filter.split(':');
      if (expression[0] === 'search') {
        this.searchText = expression[1];
      }
      if (expression[0] === 'percentage') {
        this.percentage = +expression[1];
      }
      if (expression[0] === 'skills') {
        this.skills = expression[1];
      }
    }
  }

  private textFilter(instance): boolean {
    return this.searchText == '' || (
      (
        instance.name != null &&
        instance.name.toLowerCase().includes(this.searchText.toLowerCase())
      ) || (
        instance.description != null &&
        instance.description.toLowerCase().includes(this.searchText.toLowerCase())
      ) || (
        instance.time != null &&
        instance.time.toLowerCase().includes(this.searchText.toLowerCase())
      )
    )
  }

  private percentageFilter(instance): boolean {
    return this.percentage == 100 || (
      instance.percentage != null
      && instance.percentage <= this.percentage
    )
  }

  private skillsFilter(instance): boolean {
    return this.skills == '' || (
      instance.necessarySkills != null
      && instance.necessarySkills.toLowerCase().includes(this.skills.toLowerCase())
    )
  }
}
