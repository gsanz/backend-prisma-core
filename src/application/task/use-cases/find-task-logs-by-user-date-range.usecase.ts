import { Injectable, Inject } from '@nestjs/common';
import { TASK_LOG_REPOSITORY } from '../../../domain/task/repositories/task-log.repository';
import type { TaskLogRepository } from '../../../domain/task/repositories/task-log.repository';
import { TaskLog } from '../../../domain/task/entities/task-log.entity';

@Injectable()
export class FindTaskLogsByUserAndDateRangeUseCase {
  constructor(
    @Inject(TASK_LOG_REPOSITORY)
    private readonly taskLogRepo: TaskLogRepository,
  ) {}

  async execute(userId: string, fechaInicio: Date, fechaFin: Date): Promise<TaskLog[]> {
    return this.taskLogRepo.findByUserIdAndDateRange(userId, fechaInicio, fechaFin);
  }
}
