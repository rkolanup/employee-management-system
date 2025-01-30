import { createAction, props } from '@ngrx/store';
import { Employees, Department } from '../../models/employee-list.model';
import { EmployeesState } from '../reducers/employee.reducer';

export const loadEmployeesSuccess = createAction(
    '[Employee API] Load Employees Success',
    props<{ employees: Employees[] }>()
);

export const addEmployee = createAction(
    '[Employee API] Add Employee',
    props<{ employee: Employees }>()
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

export const editEmployee = createAction(
    '[Employee API] Edit Employee',
    props<{ id: number, employee: Employees }>()
);

export const editEmployeeSuccess = createAction(
    '[Employees API] Edit Employee Success',
    props<{ employee: any }>()
);

export const editEmployeeFailure = createAction(
    '[Employees API] Edit Employee Failure',
    props<{ error: any }>()
);