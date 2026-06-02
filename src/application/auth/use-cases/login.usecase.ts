import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { USER_REPOSITORY } from '../../../domain/user/repositories/user.repository';
import type { UserRepository } from '../../../domain/user/repositories/user.repository';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginDto) {
    const user = await this.userRepo.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const payload = {
      sub: user.id,
      email: user.getEmail(),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
