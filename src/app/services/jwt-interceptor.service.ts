import { Injectable } from '@angular/core';

import {HttpRequest, HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Create an auth.interceptor.ts to attach the JWT token to every HTTP request:
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(request: HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    const currentUser = this._authService.currentUserValue;
    if(currentUser && currentUser.token){
      request = request.clone({
        setHeaders:{
          Authorization:`Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }

} // Component end
