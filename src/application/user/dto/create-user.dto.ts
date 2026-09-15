import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleName } from 'src/domain/role/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiPropertyOptional({ example: 'Pérez', description: 'Apellido del usuario' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  secondname?: string;

  @ApiProperty({ example: 'juan@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;

  @ApiPropertyOptional({ example: RoleName.ADMINISTRADOR, description: 'ID del rol del usuario' })
  @IsOptional()
  @IsString()
  roleId?: string;
}
