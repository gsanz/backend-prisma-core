import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TASK_REPOSITORY } from '../../../domain/task/repositories/task.repository';
import type { TaskRepository } from '../../../domain/task/repositories/task.repository';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepo: TaskRepository,
  ) {}

  async execute(id: string) {
    const task = await this.taskRepo.findById(id);

    if (!task) {
      throw new NotFoundException('No hay ningún id asociado');
    }
    return this.taskRepo.delete(id);
  }
}
