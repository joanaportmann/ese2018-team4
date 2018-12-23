import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  input = '';
  maxPercentage = 100;
  necessarySkills = '';
  description = '';

  constructor(private router: Router) {
    this.interpret(window.location.pathname.substr(8));
  }

  private interpret(input: String) {
    const filters = input.split('&');

    for (const filter of filters) {
      const expression = filter.split(':');
      if (expression[0] === 'search') {
        this.input = expression[1];
      }
      if (expression[0] === 'percentage') {
        this.maxPercentage = +expression[1];
      }
      if (expression[0] === 'skills') {
        this.necessarySkills = expression[1];
      }
      if (expression[0] === 'jobDescription') {
        this.description = expression[1];
      }
    }
  }

  search() {
    this.router.navigateByUrl('/demand/'
      + this.searchTerm()
      + this.percentage()
      + this.skills()
      + this.jobDescription());
  }

  private searchTerm(): String {
    return 'search:' + this.input;
  }

  private percentage(): String {
    if (this.maxPercentage == 100) {
      return '';
    }
    return '&percentage:' + this.maxPercentage;
  }

  private skills(): String {
    if (this.necessarySkills === '') {
      return '';
    }
    return '&skills:' + this.necessarySkills;
  }

  private jobDescription(): String {
    if (this.description === '') {
      return '';
    }
    return '&jobDescription:' + this.description;
  }

  formatLabel(value: number | null) {
    return value + '%';
  }

}
