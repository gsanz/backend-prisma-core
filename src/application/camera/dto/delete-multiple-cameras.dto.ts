import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsString, IsUUID } from 'class-validator';

export class DeleteMultipleCamerasDto {
  @ApiProperty({
    example: [
      'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    ],
    description: 'Lista de IDs (UUID) de cámaras a eliminar',
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  ids!: string[];
}
