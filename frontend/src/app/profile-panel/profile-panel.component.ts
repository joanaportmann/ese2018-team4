import {Component, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import {CreateJobComponent} from '../create-job/create-job.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile-panel',
  templateUrl: './profile-panel.component.html',
  styleUrls: ['./profile-panel.component.css']
})

export class ProfilePanelComponent implements OnInit {
  openJobCreationField: boolean;
  openProfileField: boolean;
  onHomeClicked: boolean = true;
  constructor(private userService: UserService) {}

  openCreateJob() {
    this.openJobCreationField = true;
    this.openProfileField = false;
    this.onHomeClicked = false;
  }
  openJobs(){
    this.onHomeClicked = true;
  }
  openProfile() {
    this.openProfileField = true;
    this.openJobCreationField = false;
    this.onHomeClicked = false;
  }
  /**
   * Return username if user exists, else return falsy value (=user).
   */
  getUsername(): string {
    const user: User = this.userService.getUser();
    return user && user.username;
  }

  ngOnInit() {}
}
