import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TASK_LOG_REPOSITORY } from '../../../domain/task/repositories/task-log.repository';
import type { TaskLogRepository } from '../../../domain/task/repositories/task-log.repository';

@Injectable()
export class DeleteTaskLogUseCase {
  constructor(
    @Inject(TASK_LOG_REPOSITORY)
    private readonly taskLogRepo: TaskLogRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.taskLogRepo.findById(id);
    if (!existing) {
      throw new NotFoundException('No se encontro el registro de tarea');
    }
    return this.taskLogRepo.delete(id);
  }
}
