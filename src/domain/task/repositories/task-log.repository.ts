import { TaskLog } from '../entities/task-log.entity';

export const TASK_LOG_REPOSITORY = 'TaskLogRepository';

export interface TaskLogRepository {
  save(taskLog: TaskLog): Promise<TaskLog>;
  findById(id: string): Promise<TaskLog | null>;
  findByUserIdAndDate(userId: string, fecha: Date): Promise<TaskLog[]>;
  findByUserIdAndDateRange(userId: string, fechaInicio: Date, fechaFin: Date): Promise<TaskLog[]>;
  update(id: string, data: UpdateTaskLogData): Promise<TaskLog>;
  delete(id: string): Promise<void>;
}

export type UpdateTaskLogData = {
  descripcion?: string | null;
  horas?: number | null;
};
