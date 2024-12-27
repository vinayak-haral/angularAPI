import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// First, create an auth.service.ts for handling login and token storage:
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public isAuthenticated:boolean = false;

  constructor(private _https:HttpClient,private _router:Router) { 

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Login The user and set value to local storage for user 
  login(username: string, password: string) {
    return this._https.post<any>(`https://localhost:7187/api/auth/login`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        if(user){
          this.isAuthenticated = true;
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  // Logout The user
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.isAuthenticated = true;
    this.currentUserSubject.next(null);
    this._router.navigate(['/login']);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }


}
