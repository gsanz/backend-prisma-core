import { Decimal } from '@prisma/client/runtime/client';

export type UpdateCameraData = {
  nombre?: string;
  latitud?: number | Decimal;
  longitud?: number | Decimal;
  url?: string;
  fuente?: string;
  fechaRegistro?: Date;
};

export class Camera {
  constructor(
    public readonly id: string,
    private nombre: string,
    private latitud: number | Decimal,
    private longitud: number | Decimal,
    private url: string,
    private fuente: string,
    private fechaRegistro: Date,
  ) {}

  /**
   * Método de fábrica para instanciar Camera.
   * Transforma automáticamente objetos Decimal en number.
   */
  static create(
    id: string,
    nombre: string,
    latitud: number | Decimal,
    longitud: number | Decimal,
    url: string,
    fuente: string,
    fechaRegistro: Date = new Date(),
  ): Camera {
    return new Camera(
      id,
      nombre,
      typeof latitud === 'number' ? latitud : latitud.toNumber(),
      typeof longitud === 'number' ? longitud : longitud.toNumber(),
      url,
      fuente,
      fechaRegistro,
    );
  }

  getId(): string {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getLatitud(): number | Decimal {
    return this.latitud;
  }

  getLongitud(): number | Decimal {
    return this.longitud;
  }

  getUrl(): string {
    return this.url;
  }

  getFuente(): string {
    return this.fuente;
  }

  getFechaRegistro(): Date {
    return this.fechaRegistro;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  setLatitud(latitud: number | Decimal): void {
    this.latitud = typeof latitud === 'number' ? latitud : latitud.toNumber();
  }

  setLongitud(longitud: number | Decimal): void {
    this.longitud =
      typeof longitud === 'number' ? longitud : longitud.toNumber();
  }

  setUrl(url: string): void {
    this.url = url;
  }

  setFuente(fuente: string): void {
    this.fuente = fuente;
  }

  setFechaRegistro(fechaRegistro: Date): void {
    this.fechaRegistro = fechaRegistro;
  }
}
