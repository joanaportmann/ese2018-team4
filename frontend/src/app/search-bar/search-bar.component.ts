import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  input = '';
  maxPercentage = 100;

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
      if (expression[0] === 'percentage')
        this.maxPercentage = +expression[1];
    }
  }

  search() {
    this.router.navigateByUrl('/demand/'
      + this.searchTerm()
      + this.percentage());
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

  formatLabel(value: number | null) {
    return value + '%';
  }

  ngOnInit() {
  }
}
