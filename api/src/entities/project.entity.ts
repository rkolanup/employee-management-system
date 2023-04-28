import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'project' })
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
