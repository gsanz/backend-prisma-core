import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/user/repositories/user.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../../../domain/user/entities/user.entity';
import { UpdateUserData } from 'src/domain/user/types/update-user-data.type';
import { AuthRepository } from 'src/domain/auth/repositories/auth.repository';
import { AuthUser } from 'src/domain/auth/entities/auth-user.entity';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findByAuthEmail(email: string): Promise<AuthUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) return null;

    return new AuthUser(user.id, user.email, user.password, user.role?.nombre ?? '');
  }
}
