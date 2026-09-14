import { IsString, IsDate, IsOptional, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskLogDto {
  @ApiProperty({ example: 'uuid-de-tarea' })
  @IsString()
  tareaId!: string;

  @ApiProperty({ example: '2026-09-15' })
  @IsString()
  fecha!: string;

  @ApiPropertyOptional({ example: 'Revisión de código' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ example: 2.5 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  horas?: number;
}
