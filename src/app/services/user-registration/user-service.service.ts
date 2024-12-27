import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseApiUrl = 'https://localhost:7187/api/UserRegistrations';

  constructor(private _https: HttpClient) { }

  addNewUser(user: User): Observable<User> {
    return this._https.post<User>(this.baseApiUrl, user);
  }

}
