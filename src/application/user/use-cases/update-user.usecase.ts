import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
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
    const existingUser = await this.userRepo.findById(id);

    if (!existingUser) {
      throw new NotFoundException('No hay ningún id asociado');
    }

    if (dto.email && dto.email !== existingUser.getEmail()) {
      const emailTaken = await this.userRepo.findByEmail(dto.email);
      if (emailTaken) {
        throw new BadRequestException('Ya existe un usuario con ese email');
      }
    }

    const data: UpdateUserData = {
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };

    return this.userRepo.update(id, data);
  }
}
