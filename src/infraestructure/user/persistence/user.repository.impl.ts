import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/user/repositories/user.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../../../domain/user/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<User> {
    const data = await this.prisma.user.create({
      data: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        createdAt: user.getCreatedAt(),
      },
    });

    return new User(
      data.id,
      data.name,
      data.email,
      data.password,
      data.createdAt,
    );
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map(
      (u) => new User(u.id, u.name, u.email, u.password, u.createdAt),
    );
  }

  async findById(id: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new User(
      data.id,
      data.name,
      data.email,
      data.password,
      data.createdAt,
    );
  }
}
