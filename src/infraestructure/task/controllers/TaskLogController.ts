import {
  Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Query, Req, Res,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiQuery, ApiProduces,
} from '@nestjs/swagger';
import { Request } from 'express';
import type { Response } from 'express';

import { CreateTaskLogDto } from '../../../application/task/dto/create-task-log.dto';
import { UpdateTaskLogDto } from '../../../application/task/dto/update-task-log.dto';
import { FindTaskLogsByDateDto, FindTaskLogsByDateRangeDto } from '../../../application/task/dto/find-task-logs.dto';
import { ExportTaskLogsDto } from '../../../application/task/dto/export-task-logs.dto';

import { CreateTaskLogUseCase } from '../../../application/task/use-cases/create-task-log.usecase';
import { FindTaskLogsByUserAndDateUseCase } from '../../../application/task/use-cases/find-task-logs-by-user-date.usecase';
import { FindTaskLogsByUserAndDateRangeUseCase } from '../../../application/task/use-cases/find-task-logs-by-user-date-range.usecase';
import { UpdateTaskLogUseCase } from '../../../application/task/use-cases/update-task-log.usecase';
import { DeleteTaskLogUseCase } from '../../../application/task/use-cases/delete-task-log.usecase';
import { ExportTaskLogsToExcelUseCase } from '../../../application/task/use-cases/export-task-logs-to-excel.usecase';

import { TaskLog } from '../../../domain/task/entities/task-log.entity';
import { JwtAuthGuard } from 'src/infraestructure/auth/jwt-auth.guard';
import { RolesGuard } from 'src/infraestructure/auth/roles.guard';
import { Roles } from 'src/infraestructure/auth/roles.decorator';
import { RoleName } from 'src/domain/role/enums/role.enum';

interface AuthRequest extends Request {
  user: { id: string };
}

@ApiTags('task-logs')
@ApiBearerAuth()
@Controller('task-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaskLogController {
  constructor(
    private readonly createTaskLogUseCase: CreateTaskLogUseCase,
    private readonly findTaskLogsByUserAndDateUseCase: FindTaskLogsByUserAndDateUseCase,
    private readonly findTaskLogsByUserAndDateRangeUseCase: FindTaskLogsByUserAndDateRangeUseCase,
    private readonly updateTaskLogUseCase: UpdateTaskLogUseCase,
    private readonly deleteTaskLogUseCase: DeleteTaskLogUseCase,
    private readonly exportTaskLogsToExcelUseCase: ExportTaskLogsToExcelUseCase,
  ) {}

  @Get('day')
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER, RoleName.TECNICO)
  @ApiOperation({ summary: 'Obtener registros de un usuario para un día concreto' })
  @ApiQuery({ name: 'fecha', required: false, type: String, description: 'Fecha en formato YYYY-MM-DD' })
  @ApiResponse({ status: 200, description: 'Registros del día', type: [TaskLog] })
  async findByDay(@Query() dto: FindTaskLogsByDateDto, @Req() request: AuthRequest): Promise<TaskLog[]> {
    const fecha = dto.fecha ? new Date(dto.fecha) : new Date();
    return this.findTaskLogsByUserAndDateUseCase.execute(request.user.id, fecha);
  }

  @Get('range')
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER, RoleName.TECNICO)
  @ApiOperation({ summary: 'Obtener registros de un usuario entre dos fechas (cargar mes del calendario)' })
  @ApiQuery({ name: 'fechaInicio', required: false, type: String, description: 'Fecha de inicio en formato YYYY-MM-DD' })
  @ApiQuery({ name: 'fechaFin', required: false, type: String, description: 'Fecha de fin en formato YYYY-MM-DD' })
  @ApiResponse({ status: 200, description: 'Registros del rango de fechas', type: [TaskLog] })
  async findByDateRange(
    @Query() dto: FindTaskLogsByDateRangeDto,
    @Req() request: AuthRequest,
  ): Promise<TaskLog[]> {
    const fechaInicio = dto.fechaInicio ? new Date(dto.fechaInicio) : new Date();
    const fechaFin = dto.fechaFin ? new Date(dto.fechaFin) : new Date();
    return this.findTaskLogsByUserAndDateRangeUseCase.execute(
      request.user.id, fechaInicio, fechaFin,
    );
  }

  @Get('export')
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER, RoleName.TECNICO)
  @ApiOperation({ summary: 'Exportar registros de tareas a Excel' })
  @ApiProduces('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @ApiQuery({ name: 'fechaInicio', required: true, type: String, description: 'Fecha inicial en formato YYYY-MM-DD' })
  @ApiQuery({ name: 'fechaFin', required: true, type: String, description: 'Fecha final en formato YYYY-MM-DD' })
  @ApiQuery({ name: 'userId', required: false, type: String, description: 'IDs de usuario separados por comas; si se omite, incluye todos' })
  @ApiResponse({ status: 200, description: 'Fichero Excel generado' })
  async export(
    @Query() dto: ExportTaskLogsDto,
    @Res() response: Response,
  ): Promise<void> {
    const fechaInicio = this.parseDateOnly(dto.fechaInicio);
    const fechaFin = this.parseDateOnly(dto.fechaFin);
    const file = await this.exportTaskLogsToExcelUseCase.execute(fechaInicio, fechaFin, dto.userId);

    response
      .status(200)
      .set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="task-logs_${dto.fechaInicio.slice(0, 10)}_${dto.fechaFin.slice(0, 10)}.xlsx"`,
        'Content-Length': file.length.toString(),
      })
      .send(file);
  }

  private parseDateOnly(value: string): Date {
    const [year, month, day] = value.slice(0, 10).split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  @Post()
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER, RoleName.TECNICO)
  @ApiOperation({ summary: 'Crear un nuevo registro de tarea ejecutada' })
  @ApiBody({ type: CreateTaskLogDto })
  @ApiResponse({ status: 201, description: 'Registro creado correctamente', type: TaskLog })
  @ApiResponse({ status: 400, description: 'La tarea no le pertenece a este usuario' })
  async create(@Body() dto: CreateTaskLogDto, @Req() request: AuthRequest): Promise<TaskLog> {
    return this.createTaskLogUseCase.execute(dto, request.user.id);
  }

  @Patch(':id')
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER, RoleName.TECNICO)
  @ApiOperation({ summary: 'Actualizar un registro de tarea' })
  @ApiBody({ type: UpdateTaskLogDto })
  @ApiResponse({ status: 200, description: 'Registro actualizado', type: TaskLog })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  async update(@Param('id') id: string, @Body() dto: UpdateTaskLogDto): Promise<TaskLog> {
    return this.updateTaskLogUseCase.execute(id, {
      descripcion: dto.descripcion,
      horas: dto.horas,
    });
  }

  @Delete(':id')
  @Roles(RoleName.ADMINISTRADOR, RoleName.MANAGER, RoleName.TECNICO)
  @ApiOperation({ summary: 'Eliminar un registro de tarea' })
  @ApiResponse({ status: 204, description: 'Registro eliminado' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteTaskLogUseCase.execute(id);
  }
}
