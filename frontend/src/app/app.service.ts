import { Injectable } from '@angular/core';
import { Employees, Department } from './models/employee-list.model';
import { Observable, of } from "rxjs"
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _url: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<Employees[]>(`${this._url}/employees`);
  }

  getDepartments() {
    return this.http.get<Department[]>(`${this._url}/departments`);
  }

  deleteEmployee(id: any) {
    return this.http.delete(`${this._url}/employees/${id}`);
  }

  updateEmployee(id: any, employeeData: any) {
    return this.http.put(`${this._url}/employees/${id}`, employeeData);
  }

  addEmployee(employeeData: any) {
    return this.http.post(`${this._url}/employees/`, employeeData);
  }
}
