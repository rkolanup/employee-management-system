import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsNotEmpty,
  Matches,
  MaxLength
} from 'class-validator';

export class Department {
  @ApiProperty({ type: Number, description: 'Department id' })
  id: number;

  @ApiProperty({ type: String, description: 'Department name' })
  @IsNotEmpty()
  @IsString()
  @Matches('^[a-zA-Z\\s]+$')
  @MinLength(3)
  @MaxLength(50)
  name: string;
}
