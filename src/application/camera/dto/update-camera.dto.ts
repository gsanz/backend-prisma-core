import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCameraDto {
  @ApiPropertyOptional({
    example: 'Provincia Castellón A-23 Km 18.6',
    description: 'Nombre o ubicación descriptiva de la cámara',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  nombre?: string;

  @ApiPropertyOptional({
    example: 39.78005278,
    description: 'Coordenada de latitud (Decimal)',
  })
  @IsOptional()
  @IsLatitude()
  @Type(() => Number)
  latitud?: number;

  @ApiPropertyOptional({
    example: -0.39301111,
    description: 'Coordenada de longitud (Decimal)',
  })
  @IsOptional()
  @IsLongitude()
  @Type(() => Number)
  longitud?: number;

  @ApiPropertyOptional({
    example: 'https://etraffic.dgt.es/camarasEtraffic/95.jpg',
    description: 'URL directa a la imagen o stream de la cámara',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  url?: string;

  @ApiPropertyOptional({
    example: 'DGT',
    description: 'Fuente u origen de los datos de la cámara',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fuente?: string;

  @ApiPropertyOptional({
    example: '2026-08-19T14:41:26.214Z',
    description: 'Fecha de registro de la cámara',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaRegistro?: Date;
}
