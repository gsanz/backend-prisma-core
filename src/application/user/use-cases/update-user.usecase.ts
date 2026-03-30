import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../domain/user/repositories/user.repository';
import type { UserRepository } from '../../../domain/user/repositories/user.repository';

import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserData } from '../../../domain/user/types/update-user-data.type';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDto) {
    // 1. comprobar que existe
    const existingUser = await this.userRepo.findById(id);

    if (!existingUser) {
      throw new NotFoundException('No hay ningún id asociado');
    }

    // 2. mapear DTO → dominio
    const data: UpdateUserData = {
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };

    // 3. actualizar
    return this.userRepo.update(id, data);
  }
}
