import { createReducer, on } from '@ngrx/store';
import { Employees, Department, EmployeeState } from '../../models/employee-list.model';
import {
    loadDepartmentsSuccess
} from '../actions/app.actions';

export const initialDepartmentsState: Department[] = []; // Initial empty array

export const departmentsReducer = createReducer(
    initialDepartmentsState,
    on(loadDepartmentsSuccess, (state, { departments }) => departments)
);