import { Module } from '@nestjs/common';
import { TaskController } from './controllers/TaskController';
import { TaskLogController } from './controllers/TaskLogController';

import { CreateTaskUseCase } from '../../application/task/use-cases/create-task.usecase';
import { FindAllTasksUseCase } from '../../application/task/use-cases/find-all-tasks.usecase';
import { FindTaskByIdUseCase } from '../../application/task/use-cases/find-task-by-id.usecase';
import { UpdateTaskUseCase } from '../../application/task/use-cases/update-task.usecase';
import { DeleteTaskUseCase } from '../../application/task/use-cases/delete-task.usecase';
import { DeleteMultipleTasksUseCase } from '../../application/task/use-cases/delete-multiple-task.usecase';

import { CreateTaskLogUseCase } from '../../application/task/use-cases/create-task-log.usecase';
import { FindTaskLogsByUserAndDateUseCase } from '../../application/task/use-cases/find-task-logs-by-user-date.usecase';
import { FindTaskLogsByUserAndDateRangeUseCase } from '../../application/task/use-cases/find-task-logs-by-user-date-range.usecase';
import { UpdateTaskLogUseCase } from '../../application/task/use-cases/update-task-log.usecase';
import { DeleteTaskLogUseCase } from '../../application/task/use-cases/delete-task-log.usecase';
import { ExportTaskLogsToExcelUseCase } from '../../application/task/use-cases/export-task-logs-to-excel.usecase';

import { TaskRepositoryImpl } from './persistence/task.repository.impl';
import { TaskLogRepositoryImpl } from './persistence/task-log.repository.impl';
import { TASK_REPOSITORY } from '../../domain/task/repositories/task.repository';
import { TASK_LOG_REPOSITORY } from '../../domain/task/repositories/task-log.repository';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController, TaskLogController],
  providers: [
    CreateTaskUseCase,
    FindAllTasksUseCase,
    FindTaskByIdUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    DeleteMultipleTasksUseCase,
    CreateTaskLogUseCase,
    FindTaskLogsByUserAndDateUseCase,
    FindTaskLogsByUserAndDateRangeUseCase,
    UpdateTaskLogUseCase,
    DeleteTaskLogUseCase,
    ExportTaskLogsToExcelUseCase,
    {
      provide: TASK_REPOSITORY,
      useClass: TaskRepositoryImpl,
    },
    {
      provide: TASK_LOG_REPOSITORY,
      useClass: TaskLogRepositoryImpl,
    },
  ],
  exports: [
    CreateTaskUseCase,
    FindAllTasksUseCase,
    FindTaskByIdUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    DeleteMultipleTasksUseCase,
    CreateTaskLogUseCase,
    FindTaskLogsByUserAndDateUseCase,
    FindTaskLogsByUserAndDateRangeUseCase,
    UpdateTaskLogUseCase,
    DeleteTaskLogUseCase,
    ExportTaskLogsToExcelUseCase,
    TASK_REPOSITORY,
    TASK_LOG_REPOSITORY,
  ],
})
export class TaskModule {}
