import { createReducer, on } from '@ngrx/store';
import { Employees, Department, EmployeeState } from '../../models/employee-list.model';
import {
    loadEmployeesSuccess,
} from '../actions/app.actions';

export const initialEmployeesState: Employees[] = [];

export const employeesReducer = createReducer(
    initialEmployeesState,
    on(loadEmployeesSuccess, (state, { employees }) => employees)
);
