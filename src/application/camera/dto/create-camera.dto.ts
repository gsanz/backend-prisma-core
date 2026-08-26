import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class CreateCameraDto {
  @ApiProperty({
    example: 'Provincia Castellón A-23 Km 18.6',
    description: 'Nombre o ubicación descriptiva de la cámara',
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  nombre!: string;

  @ApiProperty({
    example: 39.78005278,
    description: 'Coordenada de latitud (Decimal)',
  })
  @IsLatitude()
  @Type(() => Number)
  latitud!: number;

  @ApiProperty({
    example: -0.39301111,
    description: 'Coordenada de longitud (Decimal)',
  })
  @IsLongitude()
  @Type(() => Number)
  longitud!: number;

  @ApiProperty({
    example: 'https://etraffic.dgt.es/camarasEtraffic/95.jpg',
    description: 'URL directa a la imagen o stream de la cámara',
  })
  @IsString()
  @IsUrl()
  url!: string;

  @ApiProperty({
    example: 'DGT',
    description: 'Fuente u origen de los datos de la cámara',
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fuente!: string;

  @ApiPropertyOptional({
    example: '2026-08-19T14:41:26.214Z',
    description: 'Fecha de registro de la cámara (opcional)',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaRegistro?: Date;
}
