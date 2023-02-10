/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, Like } from 'typeorm';
import { Employee } from './employee.entity';
import { EmployeeModel } from './employee.model';
import { from, Observable } from 'rxjs';
import { Department } from '../department/department.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>, //Use entity only for repository
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>
  ) {}

  addNewEmployee(employeeModel: EmployeeModel): Observable<EmployeeModel> {
    return from(this.employeeRepository.save(employeeModel));
  }

  listofAllEmployees(): Observable<EmployeeModel[]> {
    return from(this.employeeRepository.find({ relations: ['department'] }));
  }

  findEmployeeById(id: number): Observable<EmployeeModel> {
    return from(
      this.employeeRepository.findOne({
        where: { id },
        relations: ['department']
      })
    );
  }

  async findByName(firstName: string, lastName: string): Promise<EmployeeModel[]> {
    return await this.employeeRepository.find({
      where: [
        { firstName: Like(`%${firstName}%`) },
        { lastName: Like(`%${lastName}%`) }
      ]
    });
  }
/*
  findEmployeeByDepartmentId(departmentId: number): Observable<EmployeeModel[]> {
    return from(
      this.employeeRepository.find({
        where: { departmentId },
        relations: ['department']
      })
    );
  }


  async findByDepartmentName(departmentName: string): Promise<EmployeeModel[]> {
    return this.employeeRepository.createQueryBuilder("employee")
      .leftJoinAndSelect("employee.department", "department")
      .where("department.name = :name", { name: departmentName })
      .getMany();
  }
*/
  updateEmployees(id: number, employeeModel: EmployeeModel): Observable<UpdateResult> {
    return from(this.employeeRepository.update(id, employeeModel));
  }

  deleteEmployee(id: number): Observable<DeleteResult> {
    return from(this.employeeRepository.delete(id));
  }
}
