import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../../../domain/role/repositories/role.repository';
import type { RoleRepository } from '../../../domain/role/repositories/role.repository';

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepo: RoleRepository,
  ) {}

  async execute(id: string) {
    const role = await this.roleRepo.findById(id);

    if (!role) {
      throw new NotFoundException('No hay ningún id asociado');
    }
    return this.roleRepo.delete(id);
  }
}
