import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteMultipleTasksDto {
  @ApiProperty({
    example: ['id1', 'id2'],
    description: 'Lista de IDs a eliminar',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
