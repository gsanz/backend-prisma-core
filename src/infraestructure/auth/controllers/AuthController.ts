import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { LoginDto } from '../../../application/auth/dto/login.dto';
import { LoginUseCase } from '../../../application/auth/use-cases/login.usecase';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Iniciar sesión de usuario',
    description: 'Autentica al usuario con email y password y devuelve un JWT',
  })
  @ApiBody({
    type: LoginDto,
    examples: {
      ejemplo1: {
        summary: 'Login estándar',
        value: {
          email: 'admin@test.com',
          password: '123456',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login correcto',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario o contraseña incorrectos',
    schema: {
      example: {
        statusCode: 401,
        message: 'Usuario o contraseña incorrectos',
        error: 'Unauthorized',
      },
    },
  })
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }
}
