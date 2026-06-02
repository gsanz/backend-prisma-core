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
    // Si la estrategia de Passport lanza un error o el usuario no existe (token inválido o ausente)
    if (err || !user) {
      throw err || new UnauthorizedException('Token no válido o ausente');
    }

    // Si todo está bien, devuelve el usuario. NestJS lo inyectará automáticamente en request.user
    return user;
  }
}

/*import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Lógica mínima: si no hay cabecera Bearer, bloqueamos con 401
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    // Si hay token, simulamos que es válido e inyectamos un usuario ficticio
    request['user'] = { sub: 'user-uuid-123', role: 'admin' };
    return true;
  }
}*/
