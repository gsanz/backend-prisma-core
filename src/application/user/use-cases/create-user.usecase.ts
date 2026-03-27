import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../domain/user/repositories/user.repository';
import type { UserRepository } from '../../../domain/user/repositories/user.repository'; // 👈 CLAVE

import { User } from '../../../domain/user/entities/user.entity';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(dto: CreateUserDto) {
    const user = User.create(uuid(), dto.name, dto.email);
    return this.userRepo.save(user);
  }
}
