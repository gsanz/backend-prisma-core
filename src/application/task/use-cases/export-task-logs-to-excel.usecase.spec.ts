import { describe, expect, it, jest } from '@jest/globals';
import ExcelJS from 'exceljs';
import { ExportTaskLogsToExcelUseCase } from './export-task-logs-to-excel.usecase';
import type { TaskLogExportRow, TaskLogRepository } from '../../../domain/task/repositories/task-log.repository';

describe('ExportTaskLogsToExcelUseCase', () => {
  it('genera un XLSX con los registros y aplica el usuario opcional', async () => {
    const rows: TaskLogExportRow[] = [
      {
        fecha: new Date('2026-09-15T00:00:00.000Z'),
        tareaNombre: 'Revisión de cámaras',
        descripcion: 'Comprobación diaria',
        horas: 2.5,
        user: { name: 'Pedro', email: 'plopez@tragsa.com' },
      },
    ];
    const findForExport = jest.fn<TaskLogRepository['findForExport']>().mockResolvedValue(rows);
    const repository = { findForExport } as unknown as TaskLogRepository;
    const useCase = new ExportTaskLogsToExcelUseCase(repository);

    const buffer = await useCase.execute(
      new Date(2026, 8, 1),
      new Date(2026, 8, 30),
      'user-id',
    );

    expect(findForExport).toHaveBeenCalledWith(
      new Date(2026, 8, 1),
      new Date(2026, 8, 30),
      'user-id',
    );

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet('TaskLog');

    expect(worksheet?.getRow(1).values).toEqual([
      undefined,
      'Fecha',
      'Usuario',
      'Email',
      'Tarea',
      'Descripción',
      'Horas',
    ]);
    expect(worksheet?.getRow(2).values).toEqual([
      undefined,
      '2026-09-15',
      'Pedro',
      'plopez@tragsa.com',
      'Revisión de cámaras',
      'Comprobación diaria',
      2.5,
    ]);
  });

  it('permite omitir el usuario para exportar todos los registros', async () => {
    const findForExport = jest.fn<TaskLogRepository['findForExport']>().mockResolvedValue([]);
    const repository = { findForExport } as unknown as TaskLogRepository;
    const useCase = new ExportTaskLogsToExcelUseCase(repository);

    await useCase.execute(new Date(2026, 8, 1), new Date(2026, 8, 30));

    expect(findForExport).toHaveBeenCalledWith(
      new Date(2026, 8, 1),
      new Date(2026, 8, 30),
      undefined,
    );
  });
});
