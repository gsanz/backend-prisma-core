export class TaskLog {
  constructor(
    public readonly id: string,
    private userId: string,
    private tareaId: string,
    private tareaNombre: string,
    private fecha: Date,
    private descripcion: string | null,
    private horas: number | null,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(
    id: string,
    userId: string,
    tareaId: string,
    tareaNombre: string,
    fecha: Date,
    descripcion: string | null,
    horas: number | null,
  ): TaskLog {
    return new TaskLog(id, userId, tareaId, tareaNombre, fecha, descripcion, horas, new Date(), new Date());
  }

  getId(): string { return this.id; }
  getUserId(): string { return this.userId; }
  getTareaId(): string { return this.tareaId; }
  getTareaNombre(): string { return this.tareaNombre; }
  getFecha(): Date { return this.fecha; }
  getDescripcion(): string | null { return this.descripcion; }
  getHoras(): number | null { return this.horas; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }

  update(descripcion: string | null, horas: number | null): void {
    this.descripcion = descripcion;
    this.horas = horas;
    this.updatedAt = new Date();
  }
}
