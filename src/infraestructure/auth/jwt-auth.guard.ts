import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // 1. Determina si se permite o no el acceso
  canActivate(context: ExecutionContext) {
    // Añade aquí tu lógica personalizada antes de validar si la necesitas
    return super.canActivate(context);
  }

  // 2. Controla la respuesta si la validación falla o tiene éxito
  handleRequest(err: any, user: any, info: any) {
    console.log('VALOR DEL USER' + user);
    // Si la estrategia de Passport lanza un error o el usuario no existe (token inválido o ausente)
    if (err || !user) {
      throw err || new UnauthorizedException('Token no válido o ausente');
    }

    // Si todo está bien, devuelve el usuario. NestJS lo inyectará automáticamente en request.user
    return user;
  }
}
