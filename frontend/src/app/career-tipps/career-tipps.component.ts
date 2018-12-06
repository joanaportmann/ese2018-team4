import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-career-tipps',
  templateUrl: './career-tipps.component.html',
  styleUrls: ['./career-tipps.component.css']
})
export class CareerTippsComponent implements OnInit {

  cv : boolean;
  coverLetter: boolean;
  jobInterview: boolean;
  preparation: boolean;

  constructor() { }

  ngOnInit() {
  }

  openCV(){
    this.cv = true;
    this.coverLetter = false;
    this.jobInterview = false;
    this.preparation = false;
  }

  openCoverLetter(){
    this.coverLetter = true;
    this.cv = false;
    this. jobInterview = false;
    this. preparation = false;
  }

  openJobInterview(){
    this.jobInterview = true;
    this.cv = false;
    this.coverLetter = false;
    this.preparation = false;
  }

  openPrep(){
    this.preparation = true;
    this.cv = false;
    this.coverLetter = false;
    this.jobInterview = false;
  }
}
