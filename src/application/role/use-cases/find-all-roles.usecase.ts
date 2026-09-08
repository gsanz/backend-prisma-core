import { Injectable, Inject } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../../../domain/role/repositories/role.repository';
import type { RoleRepository } from '../../../domain/role/repositories/role.repository';

@Injectable()
export class FindAllRolesUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepo: RoleRepository,
  ) {}

  async execute() {
    return this.roleRepo.findAll();
  }
}
