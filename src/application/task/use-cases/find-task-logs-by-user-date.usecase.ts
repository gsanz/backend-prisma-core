import { Injectable, Inject } from '@nestjs/common';
import { TASK_LOG_REPOSITORY } from '../../../domain/task/repositories/task-log.repository';
import type { TaskLogRepository } from '../../../domain/task/repositories/task-log.repository';
import { TaskLog } from '../../../domain/task/entities/task-log.entity';

@Injectable()
export class FindTaskLogsByUserAndDateUseCase {
  constructor(
    @Inject(TASK_LOG_REPOSITORY)
    private readonly taskLogRepo: TaskLogRepository,
  ) {}

  async execute(userId: string, fecha: Date): Promise<TaskLog[]> {
    return this.taskLogRepo.findByUserIdAndDate(userId, fecha);
  }
}
