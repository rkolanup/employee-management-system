import { Department, Employees } from '../models/employee-list.model';
import { EmployeesState } from './reducers/employee.reducer';

export interface AppState {
    employees: EmployeesState;
    departments: Department[];
}
