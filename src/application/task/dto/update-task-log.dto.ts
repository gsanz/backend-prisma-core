import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskLogDto {
  @ApiPropertyOptional({ example: 'Revisión de código actualizada' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ example: 3.0 })
  @IsOptional()
  @IsNumber()
  horas?: number;
}
