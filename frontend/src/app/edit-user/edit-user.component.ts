import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Job} from '../models/job';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  users: User[] = [];

  constructor(private httpClient: HttpClient, public userService: UserService) {
  }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/user').subscribe((instances: any) => {
      this.users = instances;
      //   .map((instance) =>
      //     new User();
      // });
    });
  }

 /* enable(users[i]):void {
    this.httpClient.put(`http://localhost:3000/job/${users[i].username}/enable`, users[i].enabled.toString()).subscribe();
  }*/
}
