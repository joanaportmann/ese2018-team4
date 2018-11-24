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

  search(text: string): Observable<Job[]> {
    if (!text.trim()) {
      // no text
      return of([]);
    }
    return this.http.get<Job[]>(`${this.jobsUrl}/?name=${text}`).pipe(
      tap(_ => this.log()),
      catchError(this.handleError<Job[]>('search', []))
    );
  }

  private log() {}

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log();

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
