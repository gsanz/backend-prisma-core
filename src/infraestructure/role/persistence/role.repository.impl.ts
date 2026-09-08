import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../../../domain/role/repositories/role.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '../../../domain/role/entities/role.entity';
import { UpdateRoleData } from 'src/domain/role/types/update-role-data.type';
import { PaginatedResult } from '../../../common/types/paginated-result.type';

@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(role: Role): Promise<Role> {
    const data = await this.prisma.role.create({
      data: {
        id: role.getId(),
        nombre: role.getNombre(),
        createdAt: role.getCreatedAt(),
      },
    });

    return new Role(data.id, data.nombre, data.createdAt);
  }

  async findAll(page: number, limit: number): Promise<PaginatedResult<Role>> {
    const skip = (page - 1) * limit;

    const [roles, total] = await Promise.all([
      this.prisma.role.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.role.count(),
    ]);

    const data = roles.map(
      (r) => new Role(r.id, r.nombre, r.createdAt),
    );

    return new PaginatedResult(data, total, page, limit);
  }

  async findById(id: string): Promise<Role | null> {
    const data = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new Role(data.id, data.nombre, data.createdAt);
  }

  async findByNombre(nombre: string): Promise<Role | null> {
    const data = await this.prisma.role.findUnique({
      where: { nombre },
    });

    if (!data) return null;

    return new Role(data.id, data.nombre, data.createdAt);
  }

  async update(id: string, data: UpdateRoleData): Promise<Role> {
    const updated = await this.prisma.role.update({
      where: { id },
      data: {
        ...(data.nombre && { nombre: data.nombre }),
      },
    });

    return new Role(updated.id, updated.nombre, updated.createdAt);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.role.delete({
      where: { id },
    });
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.prisma.role.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
