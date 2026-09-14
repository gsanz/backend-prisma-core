import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class FindAllTasksDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filtrar por usuario' })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Día seleccionado; devuelve las tareas del día siguiente',
    example: '2026-09-14',
  })
  @IsOptional()
  @IsDateString()
  fecha?: string;
}