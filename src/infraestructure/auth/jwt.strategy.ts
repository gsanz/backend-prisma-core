import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extrae el token del formato 'Bearer <TOKEN>'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Usa la misma clave secreta que uses para firmar tus tokens (llévatela a tu .env)
      secretOrKey: process.env.JWT_SECRET || 'clave-secreta-de-prueba',
    });
  }

  // Si el token es válido matemáticamente, Passport descodifica el payload y llama a este método
  async validate(payload: any) {
    // El objeto que devuelvas aquí es el que se inyectará en la 'request.user'
    console.log('VALOR PAYLOAD');
    console.log(payload);
    if (!payload) {
      throw new UnauthorizedException();
    }
    return { id: payload.sub, email: payload.email };
  }
}
