import {
  Controller,
  ExecutionContext,
  Get,
  INestApplication,
  UnauthorizedException,
} from '@nestjs/common';
import { beforeEach, describe, it, jest } from '@jest/globals';
import request from 'supertest';
import { TestingModule } from '@nestjs/testing/testing-module';

import { UserController } from '../../../infraestructure/user/controllers/UserController';
import { FindUserByIdUseCase } from '../../../application/user/use-cases/find-user-by-id.usecase';
import { UpdateUserUseCase } from '../../../application/user/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../../../application/user/use-cases/delete-user.usecase';
import { DeleteMultipleUsersUseCase } from '../../../application/user/use-cases/delete-multiple-user.usecase';
import { Test } from '@nestjs/testing';
import { User } from '../../../domain/user/entities/user.entity';
import { JwtAuthGuard } from '../../../infraestructure/auth/jwt-auth.guard';
import { CreateUserUseCase } from '../../../application/user/use-cases/create-user.usecase';
import { FindAllUsersUseCase } from '../../../application/user/use-cases/find-all-users.usecase';

describe('User Controller + JWT Token', () => {
  let app: INestApplication;

  const mockUpdateUserUseCase = {
    execute: jest.fn() as unknown as jest.MockedFunction<
      UpdateUserUseCase['execute']
    >,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: CreateUserUseCase, useValue: { execute: jest.fn() } },
        { provide: FindAllUsersUseCase, useValue: { execute: jest.fn() } },
        { provide: FindUserByIdUseCase, useValue: { execute: jest.fn() } },
        { provide: UpdateUserUseCase, useValue: mockUpdateUserUseCase }, // Vinculamos nuestro mock
        { provide: DeleteUserUseCase, useValue: { execute: jest.fn() } },
        {
          provide: DeleteMultipleUsersUseCase,
          useValue: { execute: jest.fn() },
        },
        JwtAuthGuard, // Necesitamos registrar el Guard en el entorno de pruebas
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          const authHeader = req.headers['authorization'];

          // Si no hay token o no empieza por Bearer, simulamos la expulsión (401)
          if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token no válido o ausente');
          }

          // Si lleva el token, inyectamos un usuario ficticio en la request y dejamos pasar (true)
          req.user = { id: 'user-uuid-123', email: 'tragsa@tragsa.es' };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('PATCH /users/:id -> debería devolver 200 y ejecutar el Caso de Uso si el token es válido', async () => {
    // Simulamos que el caso de uso termina correctamente
    mockUpdateUserUseCase.execute.mockResolvedValue({
      email: 'tragsa@tragsa.es',
      name: 'Tragsa',
      password: '1234567',
    } as unknown as User);

    return request(app.getHttpServer())
      .patch('/users/user-uuid-123')
      .set('Authorization', 'Bearer token-valido-de-prueba')
      .send({ name: 'Gorka Sanz' })
      .expect(200);
  });
});
