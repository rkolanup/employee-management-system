import { Controller, Get, Header } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DepartmentService } from './department.service';
import { Department } from './department.model';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  getDepartment(): Observable<Department[]> {
    return this.departmentService.listOfDepartments();
  }
}
