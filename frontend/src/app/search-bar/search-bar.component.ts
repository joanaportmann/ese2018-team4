import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  preset = '';

  constructor() {
    this.preset = window.location.pathname.substr(8);
  }

  ngOnInit() {
  }
}
