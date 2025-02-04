import { Component, ViewChild } from '@angular/core';
import { Employees, Department } from '../models/employee-list.model';
import { AppService } from '../app.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

//import { selectDepartments, selectEmployees, selectEmployeesList } from '../state/selectors/employee.selectors';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, tap, filter } from 'rxjs';
import { AppState } from '../state/app.state';
import { state } from '@angular/animations';
import { selectAllDepartments, selectAllEmployees, selectEmployeeLoading } from '../state/selectors/app.selectors';
import { EmployeesState } from '../state/reducers/employee.reducer';
import { addEmployee, editEmployee, deleteEmployee } from '../state/actions/app.actions';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  displayedColumns = ['name', 'email', 'department', 'action'];

  searchTerm = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  employeeData: any;
  departments: Department[] = [];
  employees$!: Observable<Employees[]>;
  departments$!: Observable<Department[]>;
  constructor(private dialog: MatDialog, private store: Store<AppState>, private appService: AppService) { }

  ngOnInit() {
    this.store.dispatch({ type: '[Employees API] Load Employees' });
    this.store.dispatch({ type: '[Departments API] Load Departments' });

    this.store.select(selectAllEmployees).subscribe((emp) => {
      this.employeeData = new MatTableDataSource<Employees>(emp);
      this.employeeData.paginator = this.paginator;
      this.employeeData.filterPredicate = this.filterEmployees;
    });

    this.store.select(selectAllDepartments).subscribe((departments) => {
      this.departments = departments;
    });
  }

  filterEmployees(data: Employees, filter: string): boolean {
    const searchString = Object.values(data).join('').toLowerCase();
    return searchString.includes(filter);
  }

  applyFilter() {
    const filterValue = this.searchTerm.toLowerCase();
    this.employeeData.filter = filterValue.trim().toLowerCase();
  }

  addEmployee() {
    const editDialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      width: '80%',
      data: {
        action: 'Add',
        departmentList: this.departments
      }
    });
    editDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(addEmployee({ employee: result }));
      }
    });
  }

  editEmployee(employee: Employees) {
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
        },
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
        this.store.dispatch(editEmployee({ id: result.id, employee: updatedEmployee }));
      } else {
        console.log('Result object is missing some properties');
      }
    });
  }

  deleteEmployee(employee: any) {
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        id: employee.id
      }
    });

    deleteDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.store.dispatch(deleteEmployee({ id: employee.id, employee: employee }));
      }
    });
  }
}
