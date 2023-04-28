/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn ,ManyToMany, JoinTable} from 'typeorm';
import { DepartmentEntity } from '../entities/department.entity';
import { ProjectEntity } from './project.entity';

@Entity({name: 'employee'})
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: "first_name"})
  firstName: string;

  @Column({name: "last_name"})
  lastName: string;

  @Column()
  email: string;

  @ManyToOne(() => DepartmentEntity)
  @JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
  department: DepartmentEntity;

  @ManyToMany(() => ProjectEntity)
  @JoinTable({
    name: 'employee_project',
    joinColumn: {
      name: 'employee_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
  })
  projects: ProjectEntity[];
}
//@ManyToOne would be used to define the relationship on the Employee entity 
//since an Employee belongs to one Department.