import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsNotEmpty,
  Matches,
  MaxLength
} from 'class-validator';

export class Project {
  @ApiProperty({ type: Number, description: 'Project id' })
  id: number;

  @ApiProperty({ type: String, description: 'Project name' })
  @IsNotEmpty()
  @IsString()
  @Matches('^[a-zA-Z\\s]+$')
  @MinLength(3)
  @MaxLength(50)
  name: string;
}
