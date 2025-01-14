import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../app.state';
import { employeesReducer } from './employee.reducer';
import { departmentsReducer } from './departments.reducer';

export const appReducers: ActionReducerMap<AppState> = {
    employees: employeesReducer,
    departments: departmentsReducer,
};
