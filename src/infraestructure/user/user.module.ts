import { Module } from '@nestjs/common';
import { UserController } from './controllers/UserController';

import { CreateUserUseCase } from '../../application/user/use-cases/create-user.usecase';
import { FindAllUsersUseCase } from '../../application/user/use-cases/find-all-users.usecase';
import { FindUserByIdUseCase } from '../../application/user/use-cases/find-user-by-id.usecase';
import { UpdateUserUseCase } from '../../application/user/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../../application/user/use-cases/delete-user.usecase';
import { DeleteMultipleUsersUseCase } from '../../application/user/use-cases/delete-multiple-user.usecase';

import { UserRepositoryImpl } from './persistence/user.repository.impl';
import { USER_REPOSITORY } from '../../domain/user/repositories/user.repository';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    DeleteMultipleUsersUseCase, // 👈 añadido
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    DeleteMultipleUsersUseCase, // 👈 añadido
    USER_REPOSITORY,
  ],
})
export class UserModule {}
