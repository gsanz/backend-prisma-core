export class Role {
  constructor(
    public readonly id: string,
    private nombre: string,
    private createdAt: Date,
  ) {}

  static create(id: string, nombre: string): Role {
    if (!nombre || nombre.length < 2) {
      throw new Error('Nombre must be at least 2 characters');
    }

    return new Role(id, nombre, new Date());
  }

  getId(): string {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
