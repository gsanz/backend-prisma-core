import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TASK_REPOSITORY } from '../../../domain/task/repositories/task.repository';
import type { TaskRepository } from '../../../domain/task/repositories/task.repository';
import { DeleteMultipleTasksDto } from '../dto/delete-multiple-tasks.dto';

@Injectable()
export class DeleteMultipleTasksUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepo: TaskRepository,
  ) {}

  async execute(dto: DeleteMultipleTasksDto): Promise<void> {
    const tasks = await Promise.all(
      dto.ids.map((id) => this.taskRepo.findById(id)),
    );

    const missing = tasks.filter((t) => !t);

    if (missing.length > 0) {
      throw new NotFoundException('Algunos ids no existen');
    }

    await this.taskRepo.deleteMany(dto.ids);
  }
}
