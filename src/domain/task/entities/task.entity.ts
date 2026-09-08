export class Task {
  constructor(
    public readonly id: string,
    private nombre: string,
    private fechaInicio: Date,
    private horasEstimadas: number,
    private userId: string,
    private createdAt: Date,
  ) {}

  static create(
    id: string,
    nombre: string,
    fechaInicio: Date,
    horasEstimadas: number,
    userId: string,
  ): Task {
    if (!nombre || nombre.length < 2) {
      throw new Error('Nombre must be at least 2 characters');
    }

    if (horasEstimadas <= 0) {
      throw new Error('Horas estimadas must be greater than 0');
    }

    return new Task(id, nombre, fechaInicio, horasEstimadas, userId, new Date());
  }

  getId(): string {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getFechaInicio(): Date {
    return this.fechaInicio;
  }

  getHorasEstimadas(): number {
    return this.horasEstimadas;
  }

  getUserId(): string {
    return this.userId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
