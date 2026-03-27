// infrastructure/user/persistence/user.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/user/repositories/user.repository';
import { User } from '../../../domain/user/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private users: User[] = [];

  save(user: User): Promise<User> {
    this.users.push(user);
    return Promise.resolve(user);
  }
}
