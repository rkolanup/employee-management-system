import { Department, Employees } from '../models/employee-list.model';
import { DepartmentsState } from './reducers/departments.reducer';
import { EmployeesState } from './reducers/employee.reducer';

export interface AppState {
    employees: EmployeesState;
    departments: DepartmentsState;
}
