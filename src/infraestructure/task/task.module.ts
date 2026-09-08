import { Module } from '@nestjs/common';
import { TaskController } from './controllers/TaskController';

import { CreateTaskUseCase } from '../../application/task/use-cases/create-task.usecase';
import { FindAllTasksUseCase } from '../../application/task/use-cases/find-all-tasks.usecase';
import { FindTaskByIdUseCase } from '../../application/task/use-cases/find-task-by-id.usecase';
import { UpdateTaskUseCase } from '../../application/task/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from '../../application/task/use-cases/delete-task.usecase';
import { DeleteMultipleTasksUseCase } from '../../application/task/use-cases/delete-multiple-task.usecase';

import { TaskRepositoryImpl } from './persistence/task.repository.impl';
import { TASK_REPOSITORY } from '../../domain/task/repositories/task.repository';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    FindAllTasksUseCase,
    FindTaskByIdUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    DeleteMultipleTasksUseCase,
    {
      provide: TASK_REPOSITORY,
      useClass: TaskRepositoryImpl,
    },
  ],
  exports: [
    CreateTaskUseCase,
    FindAllTasksUseCase,
    FindTaskByIdUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    DeleteMultipleTasksUseCase,
    TASK_REPOSITORY,
  ],
})
export class TaskModule {}
