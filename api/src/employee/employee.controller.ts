/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Put, Param, Delete} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeModel } from './employee.model';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  create(@Body() employeeModel: EmployeeModel): Observable<EmployeeModel> {
    return this.employeeService.addNewEmployee(employeeModel)
  }
  
  @Get()
  findAllEmployee(): Observable<EmployeeModel[]> {
    return this.employeeService.listofAllEmployees()
  }

  @Get(':id')
  findEmployeeById(@Param('id') id: number): Observable<EmployeeModel> {
    return this.employeeService.findEmployeeById(id)
  }

  @Get(':firstName/:lastName')
  async findByName(@Param('firstName') firstName: string, @Param('lastName') lastName: string): Promise<EmployeeModel[]> {
    return this.employeeService.findByName(firstName, lastName);
  }
/*
  @Get('department/:departmentId')
  findEmployeeByDepartmentId(@Param('departmentId') departmentId: number): Observable<EmployeeModel[]> {
    return this.employeeService.findEmployeeByDepartmentId(departmentId)
  }


  @Get('/department/:name')
  async findByDepartmentName(@Param('name') departmentName: string): Promise<EmployeeModel[]> {
    return this.employeeService.findByDepartmentName(departmentName);
  }
*/
  @Put(':id')
  updateEmployees(@Param('id') id: number, @Body() employeeModel: EmployeeModel): Observable<UpdateResult> {
    return this.employeeService.updateEmployees(id, employeeModel);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: number): Observable<DeleteResult> {
    return this.employeeService.deleteEmployee(id);
  }
}