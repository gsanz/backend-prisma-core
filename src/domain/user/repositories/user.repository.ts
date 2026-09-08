import { User } from '../entities/user.entity';
import { UpdateUserData } from '../types/update-user-data.type';
import { PaginatedResult } from '../../../common/types/paginated-result.type';

export const USER_REPOSITORY = 'UserRepository';
export interface UserRepository {
  save(user: User): Promise<User>;
  findAll(page: number, limit: number): Promise<PaginatedResult<User>>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, data: UpdateUserData): Promise<User>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
}
