import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TASK_REPOSITORY } from '../../../domain/task/repositories/task.repository';
import type { TaskRepository } from '../../../domain/task/repositories/task.repository';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { UpdateTaskData } from '../../../domain/task/types/update-task-data.type';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepo: TaskRepository,
  ) {}

  async execute(id: string, dto: UpdateTaskDto) {
    const existingTask = await this.taskRepo.findById(id);

    if (!existingTask) {
      throw new NotFoundException('No hay ningún id asociado');
    }

    const data: UpdateTaskData = {
      nombre: dto.nombre,
      fechaInicio: dto.fechaInicio ? new Date(dto.fechaInicio) : undefined,
      horasEstimadas: dto.horasEstimadas,
      userId: dto.userId,
    };

    return this.taskRepo.update(id, data);
  }
}
