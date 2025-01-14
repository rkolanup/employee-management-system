import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Employees, Department } from '../../models/employee-list.model';

// Selector for employees
export const selectEmployeesList = (state: AppState) => state.employees;

export const selectEmployees = createSelector(
    selectEmployeesList,
    (employees: Employees[]) => employees
);

// Selector for departments
export const selectDepartmentsList = (state: AppState) => state.departments;

export const selectDepartments = createSelector(
    selectDepartmentsList,
    (departments: Department[]) => departments
);

