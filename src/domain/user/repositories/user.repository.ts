import { User } from '../entities/user.entity';
import { UpdateUserData } from '../types/update-user-data.type';
export const USER_REPOSITORY = 'UserRepository';
export interface UserRepository {
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  update(id: string, data: UpdateUserData): Promise<User>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
}
