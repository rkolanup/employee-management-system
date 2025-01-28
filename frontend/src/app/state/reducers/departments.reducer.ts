import { createReducer, on } from '@ngrx/store';
import { Employees, Department } from '../../models/employee-list.model';
import {
    loadDepartmentsSuccess
} from '../actions/app.actions';

export interface DepartmentsState {
    departments: Department[];
}

const initialDepartmentsState: DepartmentsState = {
    departments: [],
};

export const departmentsReducer = createReducer(
    initialDepartmentsState,
    on(loadDepartmentsSuccess, (state, { departments }) => ({
        ...state,
        departments, // Keep the state structure intact
    }))
);






// export const departmentsReducer = createReducer(
//     initialDepartmentsState,
//     on(loadDepartmentsSuccess, (state, { departments }) => departments)
// );