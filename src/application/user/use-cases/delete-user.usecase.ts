import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../domain/user/repositories/user.repository';
import type { UserRepository } from '../../../domain/user/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(id: string) {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new NotFoundException('No hay ningún id asociado');
    }
    return this.userRepo.delete(id);
  }
}
