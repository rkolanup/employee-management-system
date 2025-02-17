import { ActionReducerMap } from '@ngrx/store';
import { employeesReducer, EmployeesState } from './employee.reducer';
import { departmentsReducer, DepartmentsState } from './departments.reducer';
import { Department } from 'src/app/models/employee-list.model';

export interface AppState {
    employees: EmployeesState;
    departments: DepartmentsState;
}

export const appReducer: ActionReducerMap<AppState> = {
    employees: employeesReducer,
    departments: departmentsReducer,
};
