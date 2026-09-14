import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindTaskLogsByDateDto {
  @ApiPropertyOptional({ example: '2026-09-15' })
  @IsOptional()
  @IsString()
  fecha?: string;
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
