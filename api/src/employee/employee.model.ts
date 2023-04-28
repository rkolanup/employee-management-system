/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MinLength, IsNotEmpty, Matches, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Department } from '../department/department.model';
import { Project } from '../project/project.model';

export class Employee {
  @ApiProperty({ type: Number, description: 'Employee id' })
  id?: number;

  @ApiProperty({ type: String, description: 'Employee first name' })
  @IsNotEmpty()
  @IsString()
  @Matches('^[a-zA-Z\\s]+$')
  @MinLength(3)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ type: String, description: 'Employee last name' })
  @IsNotEmpty()
  @IsString()
  @Matches('^[a-zA-Z\\s]+$')
  @MinLength(3)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({ type: String, description: 'Employee email address' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: Number, description: 'Employee department id' })
  @IsNotEmpty()
  department: Department;

  projects: Project[];
}
  