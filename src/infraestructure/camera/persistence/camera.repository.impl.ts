import { Injectable } from '@nestjs/common';
import { CameraRepository } from '../../../domain/camera/repositories/camera.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { Camera } from '../../../domain/camera/entities/camera.entity';
import { UpdateCameraData } from 'src/domain/camera/types/update-camera-data.type';
import { PaginatedResult } from '../../../common/types/paginated-result.type';

@Injectable()
export class CameraRepositoryImpl implements CameraRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(camera: Camera): Promise<Camera> {
    const data = await this.prisma.camaraGva.create({
      data: {
        id: camera.getId(),
        nombre: camera.getNombre(),
        latitud: camera.getLatitud(),
        longitud: camera.getLongitud(),
        url: camera.getUrl(),
        fuente: camera.getFuente(),
        fechaRegistro: camera.getFechaRegistro(),
      },
    });

    return new Camera(
      data.id,
      data.nombre,
      data.latitud,
      data.longitud,
      data.url,
      data.fuente,
      data.fechaRegistro,
    );
  }

  async findAll(page: number, limit: number): Promise<PaginatedResult<Camera>> {
    const skip = (page - 1) * limit;

    const [cameras, total] = await Promise.all([
      this.prisma.camaraGva.findMany({
        skip,
        take: limit,
        orderBy: { fechaRegistro: 'desc' },
      }),
      this.prisma.camaraGva.count(),
    ]);

    const data = cameras.map(
      (c) =>
        new Camera(
          c.id,
          c.nombre,
          c.latitud,
          c.longitud,
          c.url,
          c.fuente,
          c.fechaRegistro,
        ),
    );

    return new PaginatedResult(data, total, page, limit);
  }

  async findById(id: string): Promise<Camera | null> {
    const data = await this.prisma.camaraGva.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new Camera(
      data.id,
      data.nombre,
      data.latitud,
      data.longitud,
      data.url,
      data.fuente,
      data.fechaRegistro,
    );
  }

  async update(id: string, data: UpdateCameraData): Promise<Camera> {
    const updated = await this.prisma.camaraGva.update({
      where: { id },
      data: {
        ...(data.nombre && { name: data.nombre }),
        ...(data.latitud && { email: data.latitud }),
        ...(data.longitud && { password: data.longitud }),
      },
    });

    return new Camera(
      updated.id,
      updated.nombre,
      updated.latitud,
      updated.longitud,
      updated.url,
      updated.fuente,
      updated.fechaRegistro,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
