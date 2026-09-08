import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';

import { CreateUserDto } from '../../../application/user/dto/create-user.dto';
import { UpdateUserDto } from '../../../application/user/dto/update-user.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

import { CreateUserUseCase } from '../../../application/user/use-cases/create-user.usecase';
import { FindAllUsersUseCase } from '../../../application/user/use-cases/find-all-users.usecase';
import { FindUserByIdUseCase } from '../../../application/user/use-cases/find-user-by-id.usecase';
import { UpdateUserUseCase } from '../../../application/user/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../../../application/user/use-cases/delete-user.usecase';

import { DeleteMultipleUsersDto } from '../../../application/user/dto/delete-multiple-users.dto';
import { DeleteMultipleUsersUseCase } from '../../../application/user/use-cases/delete-multiple-user.usecase';

import { User } from '../../../domain/user/entities/user.entity';
import { JwtAuthGuard } from 'src/infraestructure/auth/jwt-auth.guard';
import { RolesGuard } from 'src/infraestructure/auth/roles.guard';
import { Roles } from 'src/infraestructure/auth/roles.decorator';
import { RoleName } from 'src/domain/role/enums/role.enum';
import { PaginatedResult } from '../../../common/types/paginated-result.type';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly deleteMultipleUsersUseCase: DeleteMultipleUsersUseCase,
  ) {}

  @Post()
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER)
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
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER)
  @ApiOperation({ summary: 'Obtener todos los usuarios (paginado)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Elementos por página' })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de usuarios',
  })
  async findAll(@Query() pagination: PaginationDto): Promise<PaginatedResult<User>> {
    return this.findAllUsersUseCase.execute(pagination.page ?? 1, pagination.limit ?? 10);
  }

  @Get(':id')
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER)
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'No hay ningún id asociado',
  })
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.findUserByIdUseCase.execute(id);
  }

  @Patch(':id')
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER)
  @ApiOperation({ summary: 'Actualizar parcialmente un usuario' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'No hay ningún id asociado',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.updateUserUseCase.execute(id, dto);
  }

  @Delete(':id')
  @Roles(RoleName.ADMINISTRADOR)
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({
    status: 204,
    description: 'Usuario eliminado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No hay ningún id asociado',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteUserUseCase.execute(id);
  }

  @Delete()
  @Roles(RoleName.ADMINISTRADOR)
  @ApiOperation({ summary: 'Eliminar múltiples usuarios' })
  @ApiBody({ type: DeleteMultipleUsersDto })
  @ApiResponse({
    status: 204,
    description: 'Usuarios eliminados correctamente',
  })
  async deleteMultiple(@Body() dto: DeleteMultipleUsersDto): Promise<void> {
    return this.deleteMultipleUsersUseCase.execute(dto);
  }
}
