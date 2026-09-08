import { Task } from '../entities/task.entity';
import { UpdateTaskData } from '../types/update-task-data.type';

export const TASK_REPOSITORY = 'TaskRepository';

export interface TaskRepository {
  save(task: Task): Promise<Task>;
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  findByUserId(userId: string): Promise<Task[]>;
  update(id: string, data: UpdateTaskData): Promise<Task>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
}
