import { Module } from '@nestjs/common';
import { UserController } from './controllers/UserController';
import { CreateUserUseCase } from '../../application/user/use-cases/create-user.usecase';
import { UserRepositoryImpl } from './persistence/user.repository.impl';
import { USER_REPOSITORY } from '../../domain/user/repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [CreateUserUseCase, USER_REPOSITORY],
})
export class UserModule {}
