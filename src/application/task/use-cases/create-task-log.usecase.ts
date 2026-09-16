import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { TASK_LOG_REPOSITORY } from '../../../domain/task/repositories/task-log.repository';
import { TASK_REPOSITORY } from '../../../domain/task/repositories/task.repository';
import type { TaskLogRepository } from '../../../domain/task/repositories/task-log.repository';
import type { TaskRepository } from '../../../domain/task/repositories/task.repository';
import { TaskLog } from '../../../domain/task/entities/task-log.entity';
import { Task } from '../../../domain/task/entities/task.entity';
import { v4 as uuid } from 'uuid';
import { CreateTaskLogDto } from '../dto/create-task-log.dto';
import { parseDateOnly } from '../../../common/utils/date-only';

@Injectable()
export class CreateTaskLogUseCase {
  constructor(
    @Inject(TASK_LOG_REPOSITORY)
    private readonly taskLogRepo: TaskLogRepository,
    @Inject(TASK_REPOSITORY)
    private readonly taskRepo: TaskRepository,
  ) {}

  async execute(dto: CreateTaskLogDto, userId: string) {
    const task = await this.taskRepo.findById(dto.tareaId);
    if (!task) {
      throw new BadRequestException('La tarea especificada no existe');
    }
    if (task.getUserId() !== userId) {
      throw new BadRequestException('La tarea no le pertenece a este usuario');
    }

    const fecha = parseDateOnly(dto.fecha);
    if (Number.isNaN(fecha.getTime())) {
      throw new BadRequestException('La fecha debe tener el formato YYYY-MM-DD');
    }

    const taskLog = TaskLog.create(
      uuid(),
      userId,
      dto.tareaId,
      task.getNombre(),
      fecha,
      dto.descripcion ?? null,
      dto.horas ?? null,
    );
    return this.taskLogRepo.save(taskLog);
  }
}
