import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseApiUrl = 'https://localhost:7187/api/Products';
  header:any;

  constructor(private _https: HttpClient,private _authService:AuthService) {
    this.header = this._authService.currentUserValue.token;
   }



  getAppEmployee():Observable<Employee[]>{
    return this._https.get<Employee []>(this.baseApiUrl);
   }

   getProducts(): Observable<any> {
    // const currentUser = this._authService.currentUserValue;
    // const token = localStorage.getItem('authToken'); 

    // const setHeaders = new HttpHeaders({
    //       Authorization:`Bearer ${currentUser.token}`
    //   });

    return this._https.get<Employee[]>(this.baseApiUrl);
  }

  addProduct(product: Employee): Observable<Employee> {
    return this._https.post<Employee>(this.baseApiUrl, product);
  }

  updateProduct(id: string, product: Employee): Observable<any> {
    return this._https.put(`${this.baseApiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this._https.delete(`${this.baseApiUrl}/${id}`);
  }

}
