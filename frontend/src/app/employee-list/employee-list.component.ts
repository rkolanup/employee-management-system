import { Component, ViewChild } from '@angular/core';
import { Employees, Department } from './employee-list.model';
import { EmployeeListService } from '../employee-list.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import{ ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent  {
  displayedColumns = ['firstName', 'lastName', 'email', 'department','action'];
  departments: Department[] = [];
  dataSource!: MatTableDataSource<Employees>;

  searchTerm= '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeListService: EmployeeListService, private dialog: MatDialog) {}

  ngOnInit() {
    this.employeeListService.getEmployees().subscribe(data => {
      this.dataSource = new MatTableDataSource<Employees>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.filterEmployees;
    });

    this.employeeListService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  filterEmployees(data: Employees, filter: string): boolean {
    const searchString = Object.values(data).join('').toLowerCase();
    return searchString.includes(filter);
  }

  applyFilter() {
    const filterValue = this.searchTerm.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addEmployee(){ 
    const editDialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      width: '80%',
      data: { 
        action: 'Add',
        departmentList: this.departments 
      }
    });
    editDialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add new employee record
        this.employeeListService.addEmployee(result).subscribe(newEmployee => {
          console.log('New Employee: ', newEmployee);
        });
      }
    });
  }

  editEmployee(employee: Employees) {
    console.log('Edit EMPLOYEE Departments: ',this.departments) 
    const editDialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      width: '80%',
      data: {
        action: 'Edit',
        departmentList: this.departments,
        info: {
          id: employee.id,
          firstName: employee.firstName, 
          lastName: employee.lastName, 
          email: employee.email, 
          department: {
            id: employee.department.id,
            name: employee.department.name
          }
        } ,      
      }
    });
  
    editDialogRef.afterClosed().subscribe(result => {
      if (result && result.firstName && result.lastName && result.email && result.department) {
        const updatedEmployee: Employees = {
          id: employee.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          department: result.department
        };
  
       this.employeeListService.updateEmployee(result.id, updatedEmployee).subscribe(result => {
          console.log('Update Result: ', result);
        });
      } else {
        console.log('Result object is missing some properties');
      }
    });
  }

  deleteEmployee(employee: any) {
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent,{
      data: {
        id: employee.id
      }
    });

    deleteDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Delete employee record
        console.log('Deleting employee record:', employee);
        this.employeeListService.deleteEmployee(employee.id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(e => e.id !== employee.id);
        });
      }
    });
  }
}
