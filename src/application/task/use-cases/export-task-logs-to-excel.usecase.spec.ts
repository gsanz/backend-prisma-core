import { describe, expect, it, jest } from '@jest/globals';
import ExcelJS from 'exceljs';
import { ExportTaskLogsToExcelUseCase } from './export-task-logs-to-excel.usecase';
import type {
  TaskLogExportRow,
  TaskLogRepository,
} from '../../../domain/task/repositories/task-log.repository';

describe('ExportTaskLogsToExcelUseCase', () => {
  it('genera un XLSX con los registros y aplica el usuario opcional', async () => {
    const rows: TaskLogExportRow[] = [
      {
        fecha: new Date('2026-09-15T00:00:00.000Z'),
        tareaNombre: 'Revisión de cámaras',
        descripcion: 'Comprobación diaria',
        horas: 2.5,
        user: {
          name: 'Pedro',
          secondname: 'López',
          email: 'plopez@tragsa.com',
        },
      },
    ];
    const findForExport = jest
      .fn<TaskLogRepository['findForExport']>()
      .mockResolvedValue(rows);
    const repository = { findForExport } as unknown as TaskLogRepository;
    const useCase = new ExportTaskLogsToExcelUseCase(repository);

    const buffer = await useCase.execute(
      new Date(2026, 8, 1),
      new Date(2026, 8, 30),
      '9d4ac6a2-a3e7-41c0-8d80-09c87122fa84',
    );

    expect(findForExport).toHaveBeenCalledWith(
      new Date(2026, 8, 1),
      new Date(2026, 8, 30),
      ['9d4ac6a2-a3e7-41c0-8d80-09c87122fa84'],
    );

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet('TaskLog');

    expect(worksheet?.getCell('A1').value).toBe(
      'APOYO TÉCNICO A LAS NECESIDADES DE LA AVSRE DERIVADAS DE LAS CONSECUENCIAS DE LA DANA 2024',
    );
    expect(worksheet?.getRow(2).values).toEqual([
      undefined,
      'Fecha',
      'Nombre del Técnico',
      'Actividades',
      'Observaciones',
    ]);
    expect(worksheet?.getRow(3).values).toEqual([
      undefined,
      '2026-09-15',
      'Pedro López',
      'Revisión de cámaras',
      'Comprobación diaria',
    ]);
  });

  it('permite omitir el usuario para exportar todos los registros', async () => {
    const findForExport = jest
      .fn<TaskLogRepository['findForExport']>()
      .mockResolvedValue([]);
    const repository = { findForExport } as unknown as TaskLogRepository;
    const useCase = new ExportTaskLogsToExcelUseCase(repository);

    await useCase.execute(new Date(2026, 8, 1), new Date(2026, 8, 30));

    expect(findForExport).toHaveBeenCalledWith(
      new Date(2026, 8, 1),
      new Date(2026, 8, 30),
      undefined,
    );
  });

  it('filtra por varios usuarios separados por comas', async () => {
    const findForExport = jest
      .fn<TaskLogRepository['findForExport']>()
      .mockResolvedValue([]);
    const repository = { findForExport } as unknown as TaskLogRepository;
    const useCase = new ExportTaskLogsToExcelUseCase(repository);

    await useCase.execute(
      new Date(2026, 8, 1),
      new Date(2026, 8, 30),
      '9d4ac6a2-a3e7-41c0-8d80-09c87122fa84, 11111111-1111-4111-8111-111111111111,22222222-2222-4222-8222-222222222222',
    );

    expect(findForExport).toHaveBeenCalledWith(
      new Date(2026, 8, 1),
      new Date(2026, 8, 30),
      [
        '9d4ac6a2-a3e7-41c0-8d80-09c87122fa84',
        '11111111-1111-4111-8111-111111111111',
        '22222222-2222-4222-8222-222222222222',
      ],
    );
  });
});
