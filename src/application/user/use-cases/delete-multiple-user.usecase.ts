import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../domain/user/repositories/user.repository';
import type { UserRepository } from '../../../domain/user/repositories/user.repository';
import { DeleteMultipleUsersDto } from '../dto/delete-multiple-users.dto';

@Injectable()
export class DeleteMultipleUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(dto: DeleteMultipleUsersDto): Promise<void> {
    // opcional: validar que existan
    const users = await Promise.all(
      dto.ids.map((id) => this.userRepo.findById(id)),
    );

    const missing = users.filter((u) => !u);

    if (missing.length > 0) {
      throw new NotFoundException('Algunos ids no existen');
    }

    await this.userRepo.deleteMany(dto.ids);
  }
}
