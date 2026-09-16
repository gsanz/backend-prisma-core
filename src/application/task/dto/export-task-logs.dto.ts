import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class ExportTaskLogsDto {
  @ApiProperty({ example: '2026-09-01', description: 'Fecha inicial incluida' })
  @IsDateString()
  fechaInicio: string;

  @ApiProperty({ example: '2026-09-30', description: 'Fecha final incluida' })
  @IsDateString()
  fechaFin: string;

  @ApiPropertyOptional({
    description: 'IDs de usuario separados por comas. Si se omite, incluye todos los usuarios.',
    example: 'uuid-1,uuid-2,uuid-3',
  })
  @IsOptional()
  @IsString()
  userId?: string;
}
