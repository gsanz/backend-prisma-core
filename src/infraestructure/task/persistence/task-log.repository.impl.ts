import { Injectable } from '@nestjs/common';
import {
  TaskLogRepository,
  TaskLogExportRow,
  UpdateTaskLogData,
} from '../../../domain/task/repositories/task-log.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskLog } from '../../../domain/task/entities/task-log.entity';

@Injectable()
export class TaskLogRepositoryImpl implements TaskLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(taskLog: TaskLog): Promise<TaskLog> {
    const data = await this.prisma.taskLog.create({
      data: {
        id: taskLog.getId(),
        userId: taskLog.getUserId(),
        tareaId: taskLog.getTareaId(),
        tareaNombre: taskLog.getTareaNombre(),
        fecha: taskLog.getFecha(),
        descripcion: taskLog.getDescripcion(),
        horas: taskLog.getHoras(),
        createdAt: taskLog.getCreatedAt(),
        updatedAt: taskLog.getUpdatedAt(),
      },
    });

    return new TaskLog(
      data.id,
      data.userId,
      data.tareaId,
      data.tareaNombre,
      data.fecha,
      data.descripcion,
      data.horas != null ? Number(data.horas) : null,
      data.createdAt,
      data.updatedAt,
    );
  }

  async findById(id: string): Promise<TaskLog | null> {
    const data = await this.prisma.taskLog.findUnique({
      where: { id },
      include: { tarea: { select: { nombre: true } } },
    });
    if (!data) return null;
    return new TaskLog(
      data.id,
      data.userId,
      data.tareaId,
      data.tarea?.nombre ?? '',
      data.fecha,
      data.descripcion,
      data.horas != null ? Number(data.horas) : null,
      data.createdAt,
      data.updatedAt,
    );
  }

  async findByUserIdsAndDate(
    userIds: string[],
    fecha: Date,
  ): Promise<TaskLog[]> {
    const startOfDay = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
    );
    const nextDay = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate() + 1,
    );

    const logs = await this.prisma.taskLog.findMany({
      where: {
        userId: { in: userIds },
        fecha: { gte: startOfDay, lt: nextDay },
      },
      orderBy: { fecha: 'asc' },
      include: { tarea: { select: { nombre: true } } },
    });

    return logs.map(
      (l) =>
        new TaskLog(
          l.id,
          l.userId,
          l.tareaId,
          l.tarea?.nombre ?? '',
          l.fecha,
          l.descripcion,
          l.horas != null ? Number(l.horas) : null,
          l.createdAt,
          l.updatedAt,
        ),
    );
  }

  async findByUserIdAndDateRange(
    userId: string,
    fechaInicio: Date,
    fechaFin: Date,
  ): Promise<TaskLog[]> {
    const startOfDay = new Date(
      fechaInicio.getFullYear(),
      fechaInicio.getMonth(),
      fechaInicio.getDate(),
    );
    const endOfDay = new Date(
      fechaFin.getFullYear(),
      fechaFin.getMonth(),
      fechaFin.getDate() + 1,
    );

    const logs = await this.prisma.taskLog.findMany({
      where: {
        userId,
        fecha: { gte: startOfDay, lt: endOfDay },
      },
      orderBy: { fecha: 'asc' },
      include: { tarea: { select: { nombre: true } } },
    });

    return logs.map(
      (l) =>
        new TaskLog(
          l.id,
          l.userId,
          l.tareaId,
          l.tarea?.nombre ?? '',
          l.fecha,
          l.descripcion,
          l.horas != null ? Number(l.horas) : null,
          l.createdAt,
          l.updatedAt,
        ),
    );
  }

  async findForExport(
    fechaInicio: Date,
    fechaFin: Date,
    userIds?: string[],
  ): Promise<TaskLogExportRow[]> {
    const startOfDay = new Date(
      fechaInicio.getFullYear(),
      fechaInicio.getMonth(),
      fechaInicio.getDate(),
    );
    const endOfDay = new Date(
      fechaFin.getFullYear(),
      fechaFin.getMonth(),
      fechaFin.getDate() + 1,
    );

    const logs = await this.prisma.taskLog.findMany({
      where: {
        ...(userIds?.length && { userId: { in: userIds } }),
        fecha: { gte: startOfDay, lt: endOfDay },
      },
      orderBy: [{ fecha: 'asc' }, { createdAt: 'asc' }],
      select: {
        fecha: true,
        tareaNombre: true,
        descripcion: true,
        horas: true,
        user: { select: { name: true, secondname: true, email: true } },
      },
    });

    return logs.map((log) => ({
      ...log,
      horas: log.horas != null ? Number(log.horas) : null,
    }));
  }

  async update(id: string, data: UpdateTaskLogData): Promise<TaskLog> {
    const existing = await this.prisma.taskLog.findUnique({
      where: { id },
      include: { tarea: { select: { nombre: true } } },
    });
    const updated = await this.prisma.taskLog.update({
      where: { id },
      data: {
        ...(data.descripcion !== undefined && {
          descripcion: data.descripcion,
        }),
        ...(data.horas !== undefined && { horas: data.horas }),
      },
    });

    return new TaskLog(
      updated.id,
      updated.userId,
      updated.tareaId,
      existing?.tarea?.nombre ?? '',
      updated.fecha,
      updated.descripcion,
      updated.horas != null ? Number(updated.horas) : null,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.taskLog.delete({ where: { id } });
  }
}
