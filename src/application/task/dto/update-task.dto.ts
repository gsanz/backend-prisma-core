import { IsString, MinLength, MaxLength, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Desarrollo de API REST' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  nombre?: string;

  @ApiPropertyOptional({ example: '2026-09-01' })
  @IsOptional()
  @IsString()
  fechaInicio?: string;

  @ApiPropertyOptional({ example: 40.5 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  horasEstimadas?: number;

  @ApiPropertyOptional({ example: 'uuid-del-usuario' })
  @IsOptional()
  @IsString()
  userId?: string;
}
