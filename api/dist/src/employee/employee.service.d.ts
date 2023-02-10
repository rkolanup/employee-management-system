import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Employee } from './employee.entity';
import { EmployeeModel } from './employee.model';
import { Observable } from 'rxjs';
import { Department } from '../department/department.entity';
export declare class EmployeeService {
    private readonly employeeRepository;
    private readonly departmentRepository;
    constructor(employeeRepository: Repository<Employee>, departmentRepository: Repository<Department>);
    addNewEmployee(employeeModel: EmployeeModel): Observable<EmployeeModel>;
    listofAllEmployees(): Observable<EmployeeModel[]>;
    findEmployeeById(id: number): Observable<EmployeeModel>;
    findByName(firstName: string, lastName: string): Promise<EmployeeModel[]>;
    updateEmployees(id: number, employeeModel: EmployeeModel): Observable<UpdateResult>;
    deleteEmployee(id: number): Observable<DeleteResult>;
}
