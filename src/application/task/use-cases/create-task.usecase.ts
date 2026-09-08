import { Injectable, Inject } from '@nestjs/common';
import { TASK_REPOSITORY } from '../../../domain/task/repositories/task.repository';
import type { TaskRepository } from '../../../domain/task/repositories/task.repository';
import { Task } from '../../../domain/task/entities/task.entity';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepo: TaskRepository,
  ) {}

  async execute(dto: CreateTaskDto) {
    const task = Task.create(
      uuid(),
      dto.nombre,
      new Date(dto.fechaInicio),
      dto.horasEstimadas,
      dto.userId || '',
    );
    return this.taskRepo.save(task);
  }
}
