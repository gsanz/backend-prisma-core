import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../domain/user/repositories/user.repository';
import type { UserRepository } from '../../../domain/user/repositories/user.repository';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(id: string) {
    return this.userRepo.findById(id);
  }
}
