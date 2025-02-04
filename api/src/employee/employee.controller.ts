/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Put, Param, Delete, Header } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  create(@Body() employeeModel: Employee): Observable<Employee> {
    return this.employeeService.addNewEmployee(employeeModel);
  }

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  findAllEmployee(): Observable<Employee[]> {
    return this.employeeService.listofAllEmployees();
  }

  @Get(':id')
  findEmployeeById(@Param('id') id: number): Observable<Employee> {
    return this.employeeService.findEmployeeById(id);
  }

  @Get(':firstName/:lastName')
  async findByName(@Param('firstName') firstName: string, @Param('lastName') lastName: string): Promise<Employee[]> {
    return this.employeeService.findByName(firstName, lastName);
  }
  /*
    @Get('department/:departmentId')
    findEmployeeByDepartmentId(@Param('departmentId') departmentId: number): Observable<Employee[]> {
      return this.employeeService.findEmployeeByDepartmentId(departmentId)
    }
  
  
    @Get('/department/:name')
    async findByDepartmentName(@Param('name') departmentName: string): Promise<Employee[]> {
      return this.employeeService.findByDepartmentName(departmentName);
    }
  */
  @Put(':id')
  updateEmployees(@Param('id') id: number, @Body() employeeModel: Employee): Observable<Employee> {
    return this.employeeService.updateEmployees(id, employeeModel);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: number): Observable<boolean> {
    return this.employeeService.deleteEmployee(id);
  }
}