import { TaskLog } from '../entities/task-log.entity';

export const TASK_LOG_REPOSITORY = 'TaskLogRepository';

export interface TaskLogRepository {
  save(taskLog: TaskLog): Promise<TaskLog>;
  findById(id: string): Promise<TaskLog | null>;
  findByUserIdsAndDate(userIds: string[], fecha: Date): Promise<TaskLog[]>;
  findByUserIdAndDateRange(
    userId: string,
    fechaInicio: Date,
    fechaFin: Date,
  ): Promise<TaskLog[]>;
  findForExport(
    fechaInicio: Date,
    fechaFin: Date,
    userIds?: string[],
  ): Promise<TaskLogExportRow[]>;
  update(id: string, data: UpdateTaskLogData): Promise<TaskLog>;
  delete(id: string): Promise<void>;
}

export type TaskLogExportRow = {
  fecha: Date;
  tareaNombre: string;
  descripcion: string | null;
  horas: number | null;
  user: {
    name: string;
    secondname: string | null;
    email: string;
  };
};

export type UpdateTaskLogData = {
  descripcion?: string | null;
  horas?: number | null;
};
