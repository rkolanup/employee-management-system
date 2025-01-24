import { createReducer, on } from '@ngrx/store';
import { Employees, Department } from '../../models/employee-list.model';
import {
    addEmployeeFailure,
    addEmployeeSuccess,
    loadEmployeesSuccess,
} from '../actions/app.actions';

export interface EmployeesState {
    employees: Employees[];
    loading: boolean;
    error: any | null;
}

export const initialEmployeesState: EmployeesState = {
    employees: [],
    loading: false,
    error: null,
};

export const employeesReducer = createReducer(
    initialEmployeesState,
    on(loadEmployeesSuccess, (state, { employees }) => ({
        ...state,
        employees,
        loading: false,
        error: null,
    })),
    on(addEmployeeSuccess, (state, { employee }) => ({
        ...state,
        employees: [...state.employees, employee],
        loading: false,
        error: null,
    })),
    on(addEmployeeFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
