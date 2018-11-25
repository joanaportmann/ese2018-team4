import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Job} from '../models/job';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }
}
