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
  content: boolean;

  constructor() { }

  ngOnInit() {
  }

  openCV(){
    this.cv = true;
    this.coverLetter = false;
    this.jobInterview = false;
    this.preparation = false;
    this.scrollDown();
  }

  openCoverLetter(){
    this.coverLetter = true;
    this.cv = false;
    this. jobInterview = false;
    this. preparation = false;
    this.scrollDown();
  }

  openJobInterview(){
    this.jobInterview = true;
    this.cv = false;
    this.coverLetter = false;
    this.preparation = false;
    this.scrollDown();
  }

  openPrep(){
    this.preparation = true;
    this.cv = false;
    this.coverLetter = false;
    this.jobInterview = false;
    this.scrollDown();
  }

  scrollDown() {
    if (this.content) {
      CareerTippsComponent.scrollDownImmediately();
    }
    else {
      setTimeout(function() {
        CareerTippsComponent.scrollDownImmediately();
        }, 1);  // wait 1 millisecond for content to render
    }
    this.content = true;
  }

  static scrollDownImmediately() {
    document.getElementById('target').scrollIntoView();
  }
}
