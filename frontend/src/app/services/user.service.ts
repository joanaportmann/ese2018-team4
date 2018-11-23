import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(): User {
    const filteredArray: string[] = document.cookie
        .replace(/\s/g, '').split(';')
        .filter(x => x.startsWith('user='));
    if(filteredArray.length === 0) { return null; }
    const userString = decodeURIComponent(filteredArray[0].substring('user='.length));
    return JSON.parse(userString.substring('j:'.length));
  }
}
