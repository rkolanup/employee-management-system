import { createAction, props } from '@ngrx/store';
import { Employees, Department } from '../../models/employee-list.model';

export const loadEmployeesSuccess = createAction(
    '[Employee API] Load Employees Success',
    props<{ employees: Employees[] }>()
);

export const loadDepartmentsSuccess = createAction(
    '[Department API] Load Departments Success',
    props<{ departments: Department[] }>()
);