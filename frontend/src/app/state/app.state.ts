import { Department, Employees } from '../models/employee-list.model';

export interface AppState {
    employees: Employees[];
    departments: Department[];
}
