import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../../domain/task/repositories/task.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { Task } from '../../../domain/task/entities/task.entity';
import { UpdateTaskData } from 'src/domain/task/types/update-task-data.type';
import { PaginatedResult } from '../../../common/types/paginated-result.type';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(task: Task): Promise<Task> {
    const data = await this.prisma.tareaUsuario.create({
      data: {
        id: task.getId(),
        nombre: task.getNombre(),
        fechaInicio: task.getFechaInicio(),
        horasEstimadas: task.getHorasEstimadas(),
        userId: task.getUserId(),
        createdAt: task.getCreatedAt(),
      },
    });

    return new Task(
      data.id,
      data.nombre,
      data.fechaInicio,
      Number(data.horasEstimadas),
      data.userId,
      data.createdAt,
    );
  }

  async findAll(page: number, limit: number): Promise<PaginatedResult<Task>> {
    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      this.prisma.tareaUsuario.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.tareaUsuario.count(),
    ]);

    const data = tasks.map(
      (t) => new Task(
        t.id,
        t.nombre,
        t.fechaInicio,
        Number(t.horasEstimadas),
        t.userId,
        t.createdAt,
      ),
    );

    return new PaginatedResult(data, total, page, limit);
  }

  async findById(id: string): Promise<Task | null> {
    const data = await this.prisma.tareaUsuario.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new Task(
      data.id,
      data.nombre,
      data.fechaInicio,
      Number(data.horasEstimadas),
      data.userId,
      data.createdAt,
    );
  }

  async findByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.prisma.tareaUsuario.findMany({
      where: { userId },
    });

    return tasks.map(
      (t) => new Task(
        t.id,
        t.nombre,
        t.fechaInicio,
        Number(t.horasEstimadas),
        t.userId,
        t.createdAt,
      ),
    );
  }

  async update(id: string, data: UpdateTaskData): Promise<Task> {
    const updated = await this.prisma.tareaUsuario.update({
      where: { id },
      data: {
        ...(data.nombre && { nombre: data.nombre }),
        ...(data.fechaInicio && { fechaInicio: data.fechaInicio }),
        ...(data.horasEstimadas && { horasEstimadas: data.horasEstimadas }),
        ...(data.userId && { userId: data.userId }),
      },
    });

    return new Task(
      updated.id,
      updated.nombre,
      updated.fechaInicio,
      Number(updated.horasEstimadas),
      updated.userId,
      updated.createdAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tareaUsuario.delete({
      where: { id },
    });
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.prisma.tareaUsuario.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
