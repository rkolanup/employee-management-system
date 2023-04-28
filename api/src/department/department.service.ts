import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { DepartmentEntity } from '../entities/department.entity';
import { Department } from './department.model';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>
  ) {}

  listOfDepartments(): Observable<Department[]> {
    return from(this.departmentRepository.find());
  }
}
