import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from '../../../application/user/dto/create-user.dto';
import { CreateUserUseCase } from '../../../application/user/use-cases/create-user.usecase';
import { FindAllUsersUseCase } from '../../../application/user/use-cases/find-all-users.usecase';
import { User } from '../../../domain/user/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.findAllUsersUseCase.execute();
  }
}
