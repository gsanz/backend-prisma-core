import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'Administrador' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  nombre!: string;
}
