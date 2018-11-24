import {Component, HostBinding, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-available-jobs',
  templateUrl: './available-jobs.component.html',
  styleUrls: ['./available-jobs.component.css']
})
export class AvailableJobsComponent {

  constructor(private httpClient: HttpClient) { }

  @HostBinding('class.is-open') @Input()
  isOpen = false;

}
