import { createAction, props } from '@ngrx/store';
import { Employees, Department } from '../../models/employee-list.model';
import { EmployeesState } from '../reducers/employee.reducer';

export const loadEmployeesSuccess = createAction(
    '[Employee API] Load Employees Success',
    props<{ employees: Employees[] }>()
);

export const addEmployeeSuccess = createAction(
    '[Employees API] Add Employee Success',
    props<{ employee: Employees }>()
);

export const addEmployeeFailure = createAction(
    '[Employees API] Add Employee Failure',
    props<{ error: any }>()
);

export const loadDepartmentsSuccess = createAction(
    '[Department API] Load Departments Success',
    props<{ departments: Department[] }>()
);