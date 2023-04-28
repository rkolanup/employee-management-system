import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { EmployeeEntity } from './employee.entity';

@Entity({ name: 'jn_employee_project' })
export class JNEmployeeProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EmployeeEntity)
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'id' })
  employee: EmployeeEntity;

  @ManyToOne(() => ProjectEntity)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: ProjectEntity;
}
