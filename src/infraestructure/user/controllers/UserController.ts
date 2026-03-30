import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { CreateUserDto } from '../../../application/user/dto/create-user.dto';
import { CreateUserUseCase } from '../../../application/user/use-cases/create-user.usecase';
import { FindAllUsersUseCase } from '../../../application/user/use-cases/find-all-users.usecase';
import { FindUserByIdUseCase } from '../../../application/user/use-cases/find-user-by-id.usecase';
import { User } from '../../../domain/user/entities/user.entity';

@ApiTags('users') // 👈 agrupa en Swagger
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado correctamente',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  async create(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios',
    type: [User],
  })
  async findAll(): Promise<User[]> {
    return this.findAllUsersUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios',
    type: [User],
  })
  async findUserById(@Param('id') id: string): Promise<User | null> {
    return this.findUserByIdUseCase.execute(id);
  }
}
