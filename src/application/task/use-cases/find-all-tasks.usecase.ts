import { Injectable, Inject } from '@nestjs/common';
import { TASK_REPOSITORY } from '../../../domain/task/repositories/task.repository';
import type { TaskRepository } from '../../../domain/task/repositories/task.repository';

@Injectable()
export class FindAllTasksUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepo: TaskRepository,
  ) {}

  async execute(page: number, limit: number) {
    return this.taskRepo.findAll(page, limit);
  }
}
