import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../../../domain/role/repositories/role.repository';
import type { RoleRepository } from '../../../domain/role/repositories/role.repository';
import { DeleteMultipleRolesDto } from '../dto/delete-multiple-roles.dto';

@Injectable()
export class DeleteMultipleRolesUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepo: RoleRepository,
  ) {}

  async execute(dto: DeleteMultipleRolesDto): Promise<void> {
    const roles = await Promise.all(
      dto.ids.map((id) => this.roleRepo.findById(id)),
    );

    const missing = roles.filter((r) => !r);

    if (missing.length > 0) {
      throw new NotFoundException('Algunos ids no existen');
    }

    await this.roleRepo.deleteMany(dto.ids);
  }
}
