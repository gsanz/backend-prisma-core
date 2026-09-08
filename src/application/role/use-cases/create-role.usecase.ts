import { Injectable, Inject } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../../../domain/role/repositories/role.repository';
import type { RoleRepository } from '../../../domain/role/repositories/role.repository';
import { Role } from '../../../domain/role/entities/role.entity';
import { v4 as uuid } from 'uuid';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepo: RoleRepository,
  ) {}

  async execute(dto: CreateRoleDto) {
    const role = Role.create(uuid(), dto.nombre);
    return this.roleRepo.save(role);
  }
}
