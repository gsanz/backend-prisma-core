import { Module } from '@nestjs/common';
import { RoleController } from './controllers/RoleController';

import { CreateRoleUseCase } from '../../application/role/use-cases/create-role.usecase';
import { FindAllRolesUseCase } from '../../application/role/use-cases/find-all-roles.usecase';
import { FindRoleByIdUseCase } from '../../application/role/use-cases/find-role-by-id.usecase';
import { UpdateRoleUseCase } from '../../application/role/use-cases/update-role.usecase';
import { DeleteRoleUseCase } from '../../application/role/use-cases/delete-role.usecase';
import { DeleteMultipleRolesUseCase } from '../../application/role/use-cases/delete-multiple-role.usecase';

import { RoleRepositoryImpl } from './persistence/role.repository.impl';
import { ROLE_REPOSITORY } from '../../domain/role/repositories/role.repository';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    FindAllRolesUseCase,
    FindRoleByIdUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    DeleteMultipleRolesUseCase,
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleRepositoryImpl,
    },
  ],
  exports: [
    CreateRoleUseCase,
    FindAllRolesUseCase,
    FindRoleByIdUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    DeleteMultipleRolesUseCase,
    ROLE_REPOSITORY,
  ],
})
export class RoleModule {}
