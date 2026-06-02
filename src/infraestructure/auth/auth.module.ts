import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from '../user/user.module';

import { LoginUseCase } from '../../application/auth/use-cases/login.usecase';

import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthController } from './controllers/AuthController';

@Module({
  imports: [
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

  providers: [LoginUseCase, JwtStrategy, JwtAuthGuard],

  exports: [LoginUseCase, JwtAuthGuard, PassportModule, JwtModule],
})
export class AuthModule {}
