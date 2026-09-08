import { IsString, MinLength, MaxLength, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Desarrollo de API REST' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  nombre!: string;

  @ApiProperty({ example: '2026-09-01' })
  @IsString()
  fechaInicio!: string;

  @ApiProperty({ example: 40.5 })
  @IsNumber()
  @IsPositive()
  horasEstimadas!: number;

  @ApiPropertyOptional({ example: 'uuid-del-usuario' })
  @IsOptional()
  @IsString()
  userId?: string;
}
