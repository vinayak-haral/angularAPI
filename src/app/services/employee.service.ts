import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseApiUrl = 'https://localhost:7187/api/Products';
  

  constructor(private _https: HttpClient) { }

  getAppEmployee():Observable<Employee[]>{
    return this._https.get<Employee []>(this.baseApiUrl);
   }

   getProducts(): Observable<Employee[]> {
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
