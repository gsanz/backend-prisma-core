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

import { CreateRoleDto } from '../../../application/role/dto/create-role.dto';
import { UpdateRoleDto } from '../../../application/role/dto/update-role.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

import { CreateRoleUseCase } from '../../../application/role/use-cases/create-role.usecase';
import { FindAllRolesUseCase } from '../../../application/role/use-cases/find-all-roles.usecase';
import { FindRoleByIdUseCase } from '../../../application/role/use-cases/find-role-by-id.usecase';
import { UpdateRoleUseCase } from '../../../application/role/use-cases/update-role.usecase';
import { DeleteRoleUseCase } from '../../../application/role/use-cases/delete-role.usecase';

import { DeleteMultipleRolesDto } from '../../../application/role/dto/delete-multiple-roles.dto';
import { DeleteMultipleRolesUseCase } from '../../../application/role/use-cases/delete-multiple-role.usecase';

import { Role } from '../../../domain/role/entities/role.entity';
import { JwtAuthGuard } from 'src/infraestructure/auth/jwt-auth.guard';
import { RolesGuard } from 'src/infraestructure/auth/roles.guard';
import { Roles } from 'src/infraestructure/auth/roles.decorator';
import { RoleName } from 'src/domain/role/enums/role.enum';
import { PaginatedResult } from '../../../common/types/paginated-result.type';

@ApiTags('roles')
@ApiBearerAuth()
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly findAllRolesUseCase: FindAllRolesUseCase,
    private readonly findRoleByIdUseCase: FindRoleByIdUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
    private readonly deleteMultipleRolesUseCase: DeleteMultipleRolesUseCase,
  ) {}

  @Post()
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER)
  @ApiOperation({ summary: 'Crear un rol' })
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({
    status: 201,
    description: 'Rol creado correctamente',
    type: Role,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  async create(@Body() dto: CreateRoleDto) {
    return this.createRoleUseCase.execute(dto);
  }

  @Get()
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER)
  @ApiOperation({ summary: 'Obtener todos los roles (paginado)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Elementos por página' })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de roles',
  })
  async findAll(@Query() pagination: PaginationDto): Promise<PaginatedResult<Role>> {
    return this.findAllRolesUseCase.execute(pagination.page ?? 1, pagination.limit ?? 10);
  }

  @Get(':id')
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER)
  @ApiOperation({ summary: 'Obtener rol por ID' })
  @ApiResponse({
    status: 200,
    description: 'Rol encontrado',
    type: Role,
  })
  @ApiResponse({
    status: 404,
    description: 'No hay ningún id asociado',
  })
  async findRoleById(@Param('id') id: string): Promise<Role> {
    return this.findRoleByIdUseCase.execute(id);
  }

  @Patch(':id')
  @Roles(RoleName.ADMINISTRADOR)
  @ApiOperation({ summary: 'Actualizar parcialmente un rol' })
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({
    status: 200,
    description: 'Rol actualizado correctamente',
    type: Role,
  })
  @ApiResponse({
    status: 404,
    description: 'No hay ningún id asociado',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
  ): Promise<Role> {
    return this.updateRoleUseCase.execute(id, dto);
  }

  @Delete(':id')
  @Roles(RoleName.ADMINISTRADOR)
  @ApiOperation({ summary: 'Eliminar un rol' })
  @ApiResponse({
    status: 204,
    description: 'Rol eliminado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No hay ningún id asociado',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteRoleUseCase.execute(id);
  }

  @Delete()
  @Roles(RoleName.ADMINISTRADOR)
  @ApiOperation({ summary: 'Eliminar múltiples roles' })
  @ApiBody({ type: DeleteMultipleRolesDto })
  @ApiResponse({
    status: 204,
    description: 'Roles eliminados correctamente',
  })
  async deleteMultiple(@Body() dto: DeleteMultipleRolesDto): Promise<void> {
    return this.deleteMultipleRolesUseCase.execute(dto);
  }
}
