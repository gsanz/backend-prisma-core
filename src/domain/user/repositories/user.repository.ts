import { User } from '../entities/user.entity';
export const USER_REPOSITORY = 'UserRepository';
export interface UserRepository {
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
}
