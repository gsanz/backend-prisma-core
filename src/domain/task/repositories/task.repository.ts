import { Task } from '../entities/task.entity';
import { UpdateTaskData } from '../types/update-task-data.type';
import { PaginatedResult } from '../../../common/types/paginated-result.type';

export const TASK_REPOSITORY = 'TaskRepository';

export interface TaskRepository {
  save(task: Task): Promise<Task>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Task>>;
  findById(id: string): Promise<Task | null>;
  findByUserId(userId: string): Promise<Task[]>;
  update(id: string, data: UpdateTaskData): Promise<Task>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
}
