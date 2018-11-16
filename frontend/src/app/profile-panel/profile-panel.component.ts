import {Component, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profile-panel',
  templateUrl: './profile-panel.component.html',
  styleUrls: ['./profile-panel.component.css']
})

export class ProfilePanelComponent implements OnInit {

  constructor(private userService: UserService) {}

  /**
   * Return username if user exists, else return falsy value (=user).
   */
  getUsername(): string {
    const user: User = this.userService.getUser();
    return user && user.username;
  }

  ngOnInit() {}
}
