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
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated:boolean = false;

  constructor(private _https:HttpClient,private _router:Router) { 

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.isAuthenticated = !!localStorage.getItem('token') || !!localStorage.getItem('currentUser');
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated);
  }

  // Get authentication status as Observable
  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Update authentication status
  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
    this.isAuthenticatedSubject.next(value);
  }

  // Login The user and set value to local storage for user 
  login(username: string, password: string) {
    return this._https.post<any>(`https://localhost:7187/api/auth/login`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        if(user){
          this.isAuthenticated = true;
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  // Logout The user
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

}
