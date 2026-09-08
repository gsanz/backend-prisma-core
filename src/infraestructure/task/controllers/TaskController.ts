import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { CreateTaskDto } from '../../../application/task/dto/create-task.dto';
import { UpdateTaskDto } from '../../../application/task/dto/update-task.dto';

import { CreateTaskUseCase } from '../../../application/task/use-cases/create-task.usecase';
import { FindAllTasksUseCase } from '../../../application/task/use-cases/find-all-tasks.usecase';
import { FindTaskByIdUseCase } from '../../../application/task/use-cases/find-task-by-id.usecase';
import { UpdateTaskUseCase } from '../../../application/task/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from '../../../application/task/use-cases/delete-task.usecase';

import { DeleteMultipleTasksDto } from '../../../application/task/dto/delete-multiple-tasks.dto';
import { DeleteMultipleTasksUseCase } from '../../../application/task/use-cases/delete-multiple-task.usecase';

import { Task } from '../../../domain/task/entities/task.entity';
import { JwtAuthGuard } from 'src/infraestructure/auth/jwt-auth.guard';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findAllTasksUseCase: FindAllTasksUseCase,
    private readonly findTaskByIdUseCase: FindTaskByIdUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly deleteMultipleTasksUseCase: DeleteMultipleTasksUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una tarea' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: 'Tarea creada correctamente',
    type: Task,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  async create(@Body() dto: CreateTaskDto) {
    return this.createTaskUseCase.execute(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tareas',
    type: [Task],
  })
  async findAll(): Promise<Task[]> {
    return this.findAllTasksUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tarea por ID' })
  @ApiResponse({
    status: 200,
    description: 'Tarea encontrada',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'No hay ningún id asociado',
  })
  async findTaskById(@Param('id') id: string): Promise<Task> {
    return this.findTaskByIdUseCase.execute(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Actualizar parcialmente una tarea' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Tarea actualizada correctamente',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'No hay ningún id asociado',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.updateTaskUseCase.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiResponse({
    status: 204,
    description: 'Tarea eliminada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No hay ningún id asociado',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteTaskUseCase.execute(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Eliminar múltiples tareas' })
  @ApiBody({ type: DeleteMultipleTasksDto })
  @ApiResponse({
    status: 204,
    description: 'Tareas eliminadas correctamente',
  })
  async deleteMultiple(@Body() dto: DeleteMultipleTasksDto): Promise<void> {
    return this.deleteMultipleTasksUseCase.execute(dto);
  }
}
