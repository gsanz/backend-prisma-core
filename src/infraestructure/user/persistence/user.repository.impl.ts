import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/user/repositories/user.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../../../domain/user/entities/user.entity';
import { UpdateUserData } from 'src/domain/user/types/update-user-data.type';
import { PaginatedResult } from '../../../common/types/paginated-result.type';

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

  async findAll(page: number, limit: number): Promise<PaginatedResult<User>> {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    const data = users.map(
      (u) => new User(u.id, u.name, u.email, u.password, u.createdAt),
    );

    return new PaginatedResult(data, total, page, limit);
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

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: { email },
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

  async update(id: string, data: UpdateUserData): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        ...(data.password && { password: data.password }),
      },
    });

    return new User(
      updated.id,
      updated.name,
      updated.email,
      updated.password,
      updated.createdAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tareaUsuario.deleteMany({
      where: { userId: id },
    });
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.prisma.tareaUsuario.deleteMany({
      where: {
        userId: {
          in: ids,
        },
      },
    });
    await this.prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
