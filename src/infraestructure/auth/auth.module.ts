import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from '../user/user.module';

import { LoginUseCase } from '../../application/auth/use-cases/login.usecase';

import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthController } from './controllers/AuthController';
import { AUTH_REPOSITORY } from '../../domain/auth/repositories/auth.repository';
import { AuthRepositoryImpl } from './persistence/auth.repository.impl';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');

        if (configService.get('NODE_ENV') === 'production' && !secret) {
          throw new Error('CRÍTICO: JWT_SECRET no está definido en producción');
        }

        return {
          secret: secret || 'clave-secreta-de-prueba',
          signOptions: {
            expiresIn: '24h',
          },
        };
      },
    }),
  ],

  controllers: [AuthController],

  providers: [
    LoginUseCase,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepositoryImpl,
    },
  ],

  exports: [
    LoginUseCase,
    JwtAuthGuard,
    PassportModule,
    JwtModule,
    AUTH_REPOSITORY,
  ],
})
export class AuthModule {}
/*
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
  ]


*/
