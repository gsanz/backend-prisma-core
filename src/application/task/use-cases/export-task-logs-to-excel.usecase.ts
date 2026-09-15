import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';
import { TASK_LOG_REPOSITORY } from '../../../domain/task/repositories/task-log.repository';
import type { TaskLogRepository } from '../../../domain/task/repositories/task-log.repository';

@Injectable()
export class ExportTaskLogsToExcelUseCase {
  constructor(
    @Inject(TASK_LOG_REPOSITORY)
    private readonly taskLogRepo: TaskLogRepository,
  ) {}

  async execute(fechaInicio: Date, fechaFin: Date, userId?: string): Promise<Buffer> {
    if (fechaInicio > fechaFin) {
      throw new BadRequestException('La fechaInicio no puede ser posterior a la fechaFin');
    }

    const rows = await this.taskLogRepo.findForExport(fechaInicio, fechaFin, userId);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('TaskLog');

    worksheet.columns = [
      { header: 'Fecha', key: 'fecha', width: 14 },
      { header: 'Usuario', key: 'usuario', width: 24 },
      { header: 'Email', key: 'email', width: 32 },
      { header: 'Tarea', key: 'tarea', width: 36 },
      { header: 'Descripción', key: 'descripcion', width: 60 },
      { header: 'Horas', key: 'horas', width: 12 },
    ];

    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1F4E78' },
    };
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];

    for (const row of rows) {
      worksheet.addRow({
        fecha: row.fecha.toISOString().slice(0, 10),
        usuario: row.user.name,
        email: row.user.email,
        tarea: row.tareaNombre,
        descripcion: row.descripcion ?? '',
        horas: row.horas,
      });
    }

    worksheet.autoFilter = {
      from: 'A1',
      to: 'F1',
    };

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}
