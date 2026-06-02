export class File {
  constructor(
    public readonly id: string,
    private name: string,
    private url: string,
    private createdAt: Date,
  ) {}

  static create(id: string, name: string, url: string): File {
    return new File(id, name, url, new Date());
  }

  // ✅ getters
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getUrl(): string {
    return this.url;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
