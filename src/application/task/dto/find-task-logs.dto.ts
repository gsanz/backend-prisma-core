import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindTaskLogsByDateDto {
  @ApiPropertyOptional({ example: '2026-09-15' })
  @IsOptional()
  @IsString()
  fecha?: string;

  @ApiPropertyOptional({
    description: 'IDs de usuario separados por comas. Si se omite, usa el usuario autenticado.',
    example: 'uuid-1,uuid-2,uuid-3',
  })
  @IsOptional()
  @IsString()
  userId?: string;
}

export class FindTaskLogsByDateRangeDto {
  @ApiPropertyOptional({ example: '2026-09-01' })
  @IsOptional()
  @IsString()
  fechaInicio?: string;

  @ApiPropertyOptional({ example: '2026-09-30' })
  @IsOptional()
  @IsString()
  fechaFin?: string;
}
