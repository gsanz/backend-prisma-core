import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    // 1. Registramos Passport configurando 'jwt' como la estrategia por defecto
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // 2. Registro asíncrono del módulo JWT utilizando el ConfigService de NestJS
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');

        // 🚨 Seguridad: Bloqueamos el arranque en producción si falta la clave secreta
        if (configService.get('NODE_ENV') === 'production' && !secret) {
          throw new Error(
            'CRÍTICO: La variable de entorno JWT_SECRET no está definida en producción.',
          );
        }

        return {
          secret: secret || 'clave-secreta-de-prueba',
          signOptions: {
            expiresIn: '24h', // El token expirará automáticamente en un día
          },
        };
      },
    }),
  ],
  providers: [
    JwtStrategy, // 🧠 Permite a Passport mapear las validaciones bajo el nombre 'jwt'
    JwtAuthGuard, // 🛡️ El Guard que intercepta las peticiones HTTP en tus controladores
  ],
  exports: [
    JwtAuthGuard, // 🔓 Lo exportamos para usarlo con @UseGuards(JwtAuthGuard) en UserController
    PassportModule, // Exportamos Passport para mantener la compatibilidad del ecosistema
  ],
})
export class AuthModule {}
