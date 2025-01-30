/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, Like } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';
import { Employee } from './employee.model';
import { from, Observable, switchMap } from 'rxjs';
import { DepartmentEntity } from '../entities/department.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>, //Use entity only for repository
  ) { }

  addNewEmployee(employeeModel: Employee): Observable<Employee> {
    return from(this.employeeRepository.save(employeeModel));
  }

  listofAllEmployees(): Observable<Employee[]> {
    return from(this.employeeRepository.find({ relations: ['department'] }));
  }

  findEmployeeById(id: number): Observable<Employee> {
    return from(
      this.employeeRepository.findOne({
        where: { id },
        relations: ['department']
      })
    );
  }

  async findByName(firstName: string, lastName: string): Promise<Employee[]> {
    return await this.employeeRepository.find({
      where: [
        { firstName: Like(`%${firstName}%`) },
        { lastName: Like(`%${lastName}%`) }
      ]
    });
  }
  /*
    findEmployeeByDepartmentId(departmentId: number): Observable<Employee[]> {
      return from(
        this.employeeRepository.find({
          where: { departmentId },
          relations: ['department']
        })
      );
    }
  
  
    async findByDepartmentName(departmentName: string): Promise<Employee[]> {
      return this.employeeRepository.createQueryBuilder("employee")
        .leftJoinAndSelect("employee.department", "department")
        .where("department.name = :name", { name: departmentName })
        .getMany();
    }
  */
  updateEmployees(id: number, employeeModel: Employee): Observable<Employee> {
    return from(this.employeeRepository.update(id, employeeModel)).pipe(
      switchMap(() => this.employeeRepository.findOne({ where: { id }, relations: ['department'] }))
    );
  }

  deleteEmployee(id: number): Observable<DeleteResult> {
    return from(this.employeeRepository.delete(id));
  }
}
