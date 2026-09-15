import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class ExportTaskLogsDto {
  @ApiProperty({ example: '2026-09-01', description: 'Fecha inicial incluida' })
  @IsDateString()
  fechaInicio: string;

  @ApiProperty({ example: '2026-09-30', description: 'Fecha final incluida' })
  @IsDateString()
  fechaFin: string;

  @ApiPropertyOptional({ description: 'ID del usuario. Si se omite, incluye todos los usuarios.' })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
