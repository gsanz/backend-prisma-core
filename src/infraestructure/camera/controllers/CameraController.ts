import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  ParseIntPipe,
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

import { CreateCameraDto } from '../../../application/camera/dto/create-camera.dto';
import { UpdateCameraDto } from '../../../application/camera/dto/update-camera.dto';
import { DeleteMultipleCamerasDto } from '../../../application/camera/dto/delete-multiple-cameras.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

import { CreateCameraUseCase } from '../../../application/camera/use-cases/create-camera.usecase';
import { FindAllCamerasUseCase } from '../../../application/camera/use-cases/find-all-cameras.usecase';
import { FindCameraByIdUseCase } from '../../../application/camera/use-cases/find-camera-by-id.usecase';
import { UpdateCameraUseCase } from '../../../application/camera/use-cases/update-camera.usecase';
import { DeleteCameraUseCase } from '../../../application/camera/use-cases/delete-camera.usecase';
import { DeleteMultipleCamerasUseCase } from '../../../application/camera/use-cases/delete-multiple-camera.usecase';

import { Camera } from '../../../domain/camera/entities/camera.entity';
import { JwtAuthGuard } from 'src/infraestructure/auth/jwt-auth.guard';
import { RolesGuard } from 'src/infraestructure/auth/roles.guard';
import { Roles } from 'src/infraestructure/auth/roles.decorator';
import { RoleName } from 'src/domain/role/enums/role.enum';
import { PaginatedResult } from '../../../common/types/paginated-result.type';

@ApiTags('cameras')
@ApiBearerAuth()
@Controller('cameras')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CameraController {
  constructor(
    private readonly createCameraUseCase: CreateCameraUseCase,
    private readonly findAllCamerasUseCase: FindAllCamerasUseCase,
    private readonly findCameraByIdUseCase: FindCameraByIdUseCase,
    private readonly updateCameraUseCase: UpdateCameraUseCase,
    private readonly deleteCameraUseCase: DeleteCameraUseCase,
    private readonly deleteMultipleCamerasUseCase: DeleteMultipleCamerasUseCase,
  ) {}

  @Post()
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER)
  @ApiOperation({ summary: 'Crear una cámara' })
  @ApiBody({ type: CreateCameraDto })
  @ApiResponse({
    status: 201,
    description: 'Cámara creada correctamente',
    type: Camera,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  async create(@Body() dto: CreateCameraDto): Promise<Camera> {
    return this.createCameraUseCase.execute(dto);
  }

  @Get()
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER)
  @ApiOperation({ summary: 'Obtener todas las cámaras (paginado)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Elementos por página' })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de cámaras',
  })
  async findAll(@Query() pagination: PaginationDto): Promise<PaginatedResult<Camera>> {
    return this.findAllCamerasUseCase.execute(pagination.page ?? 1, pagination.limit ?? 10);
  }

  @Get(':id')
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER)
  @ApiOperation({ summary: 'Obtener cámara por ID' })
  @ApiResponse({
    status: 200,
    description: 'Cámara encontrada',
    type: Camera,
  })
  @ApiResponse({
    status: 404,
    description: 'No hay ninguna cámara asociada al ID',
  })
  async findCameraById(@Param('id', ParseIntPipe) id: string): Promise<Camera> {
    return this.findCameraByIdUseCase.execute(id);
  }

  @Patch(':id')
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER)
  @ApiOperation({ summary: 'Actualizar parcialmente una cámara' })
  @ApiBody({ type: UpdateCameraDto })
  @ApiResponse({
    status: 200,
    description: 'Cámara actualizada correctamente',
    type: Camera,
  })
  @ApiResponse({
    status: 404,
    description: 'No hay ninguna cámara asociada al ID',
  })
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: UpdateCameraDto,
  ): Promise<Camera> {
    return this.updateCameraUseCase.execute(id, dto);
  }

  @Delete(':id')
  @Roles(RoleName.ADMINISTRADOR)
  @ApiOperation({ summary: 'Eliminar una cámara' })
  @ApiResponse({
    status: 204,
    description: 'Cámara eliminada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No hay ninguna cámara asociada al ID',
  })
  async delete(@Param('id', ParseIntPipe) id: string): Promise<void> {
    return this.deleteCameraUseCase.execute(id);
  }

  @Delete()
  @Roles(RoleName.ADMINISTRADOR)
  @ApiOperation({ summary: 'Eliminar múltiples cámaras' })
  @ApiBody({ type: DeleteMultipleCamerasDto })
  @ApiResponse({
    status: 204,
    description: 'Cámaras eliminadas correctamente',
  })
  async deleteMultiple(@Body() dto: DeleteMultipleCamerasDto): Promise<void> {
    return this.deleteMultipleCamerasUseCase.execute(dto);
  }
}
