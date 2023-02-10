import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeModel } from './employee.model';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    create(employeeModel: EmployeeModel): Observable<EmployeeModel>;
    findAllEmployee(): Observable<EmployeeModel[]>;
    findEmployeeById(id: number): Observable<EmployeeModel>;
    findByName(firstName: string, lastName: string): Promise<EmployeeModel[]>;
    updateEmployees(id: number, employeeModel: EmployeeModel): Observable<UpdateResult>;
    deleteEmployee(id: number): Observable<DeleteResult>;
}
