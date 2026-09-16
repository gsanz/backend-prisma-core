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
      { key: 'fecha', width: 14 },
      { key: 'tecnico', width: 30 },
      { key: 'actividades', width: 45 },
      { key: 'observaciones', width: 60 },
    ];

    worksheet.mergeCells('A1:D1');
    worksheet.getCell('A1').value =
      'APOYO TÉCNICO A LAS NECESIDADES DE LA AVSRE DERIVADAS DE LAS CONSECUENCIAS DE LA DANA 2024';
    worksheet.getCell('A1').font = { bold: true, size: 14 };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getRow(2).values = [
      'Fecha',
      'Nombre del Técnico',
      'Actividades',
      'Observaciones',
    ];
    worksheet.getRow(2).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(2).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1F4E78' },
    };
    worksheet.views = [{ state: 'frozen', ySplit: 2 }];

    for (const row of rows) {
      worksheet.addRow({
        fecha: row.fecha.toISOString().slice(0, 10),
        tecnico: `${row.user.name} ${row.user.secondname ?? ''}`.trim(),
        actividades: row.tareaNombre,
        observaciones: row.descripcion ?? '',
      });
    }

    worksheet.autoFilter = {
      from: 'A2',
      to: 'D2',
    };

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}
