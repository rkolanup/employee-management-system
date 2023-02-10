import { Department } from '../department/department.entity';
export declare class Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    departmentId: number;
    department: Department;
}
