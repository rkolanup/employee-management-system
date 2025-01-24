import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeesState } from '../reducers/employee.reducer';
import { Department } from 'src/app/models/employee-list.model';
import { AppState } from '../app.state';

export const selectEmployeesState = (state: AppState) => state.employees;
export const selectDepartmentsState = (state: AppState) => state.departments;

// Employees selectors
export const selectAllEmployees = createSelector(
    selectEmployeesState,
    (state: EmployeesState) => state.employees
);

export const selectEmployeeLoading = createSelector(
    selectEmployeesState,
    (state: EmployeesState) => state.loading
);

export const selectEmployeeError = createSelector(
    selectEmployeesState,
    (state: EmployeesState) => state.error
);

// Departments selectors
export const selectAllDepartments = createSelector(
    selectDepartmentsState,
    (state: Department[]) => state
);
