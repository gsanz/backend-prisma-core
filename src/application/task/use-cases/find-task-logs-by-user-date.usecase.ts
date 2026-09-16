import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { TASK_LOG_REPOSITORY } from '../../../domain/task/repositories/task-log.repository';
import type { TaskLogRepository } from '../../../domain/task/repositories/task-log.repository';
import { TaskLog } from '../../../domain/task/entities/task-log.entity';

@Injectable()
export class FindTaskLogsByUserAndDateUseCase {
  constructor(
    @Inject(TASK_LOG_REPOSITORY)
    private readonly taskLogRepo: TaskLogRepository,
  ) {}

  async execute(
    userId: string,
    fecha: Date,
    requestedUserIds?: string,
  ): Promise<TaskLog[]> {
    const userIds = requestedUserIds
      ?.split(',')
      .map((id) => id.trim())
      .filter(Boolean) ?? [userId];

    if (userIds.length === 0 || userIds.some((id) => !isUUID(id))) {
      throw new BadRequestException(
        'Los IDs de usuario deben ser UUID válidos',
      );
    }

    return this.taskLogRepo.findByUserIdsAndDate(userIds, fecha);
  }
}
