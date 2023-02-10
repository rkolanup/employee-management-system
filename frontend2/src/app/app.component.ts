import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeInterface } from './employeeInterface'
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'list-app';  
  employees: Observable<any> = of([]);
 // employees: EmployeeInterface[];
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
   this.employees = this.employeeService.getEmployees();
   console.log('test',this.employeeService.getEmployees())
  }
}
