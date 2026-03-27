import { Controller, Post, Body } from '@nestjs/common';
//import { CreateUserDto } from 'src/domain/user/dto/create-user.dto';
import { CreateUserDto } from '../../../application/user/dto/create-user.dto';
import { CreateUserUseCase } from '../../../application/user/use-cases/create-user.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }
}
