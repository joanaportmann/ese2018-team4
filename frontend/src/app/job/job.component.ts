import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Job} from '../models/job';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  @Input()
  job: Job;

  @Output()
  destroy = new EventEmitter<Job>();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  onSave() {
    this.httpClient.put('http://localhost:3000/job/' + this.job.id, this.job).subscribe();
  }

  onDestroy() {
    this.httpClient.delete('http://localhost:3000/job/' + this.job.id).subscribe(() => {
      this.destroy.emit(this.job);
    });
  }

}
