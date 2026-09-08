import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../../../domain/role/repositories/role.repository';
import type { RoleRepository } from '../../../domain/role/repositories/role.repository';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { UpdateRoleData } from '../../../domain/role/types/update-role-data.type';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepo: RoleRepository,
  ) {}

  async execute(id: string, dto: UpdateRoleDto) {
    const existingRole = await this.roleRepo.findById(id);

    if (!existingRole) {
      throw new NotFoundException('No hay ningún id asociado');
    }

    const data: UpdateRoleData = {
      nombre: dto.nombre,
    };

    return this.roleRepo.update(id, data);
  }
}
