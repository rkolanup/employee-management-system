/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MinLength, IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class EmployeeModel {
  @IsNotEmpty()
  @IsString()
  @Matches('^[a-zA-Z\\s]+$')
  @MinLength(3)
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^[a-zA-Z\\s]+$')
  @MinLength(3)
  @MaxLength(50)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  departmentId: number;

  id?: number;
}