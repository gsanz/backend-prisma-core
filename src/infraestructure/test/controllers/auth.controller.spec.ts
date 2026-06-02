import { INestApplication } from '@nestjs/common';
import { beforeEach, describe, it, jest } from '@jest/globals';
import request from 'supertest';
import { TestingModule } from '@nestjs/testing/testing-module';

import { LoginUseCase } from '../../../application/auth/use-cases/login.usecase';
import { Test } from '@nestjs/testing';
import { AuthController } from 'src/infraestructure/auth/controllers/AuthController';

describe('Login Test', () => {
  let app: INestApplication;

  const mockLoginUserUseCase = {
    execute: jest.fn() as unknown as jest.MockedFunction<
      LoginUseCase['execute']
    >,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: LoginUseCase, useValue: mockLoginUserUseCase }],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /auth/login -> debería devolver 200 y ejecutar el Caso de Uso si el token es válido', async () => {
    mockLoginUserUseCase.execute.mockResolvedValue({
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    } as any);

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'plopez@tragsa.com',
        password: '1234509890890',
      })
      .expect(200);
  });
});
