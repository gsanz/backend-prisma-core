export class User {
  constructor(
    public readonly id: string,
    private name: string,
    private email: string,
    private password: string,
    private createdAt: Date,
    private roleId: string | null,
  ) {}

  static create(
    id: string,
    name: string,
    email: string,
    password: string,
    roleId?: string,
  ): User {
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email');
    }

    if (password.length < 6) {
      throw new Error('Password too short');
    }

    return new User(id, name, email, password, new Date(), roleId ?? null);
  }

  // 🔒 validación privada
  private static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ✅ getters
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getRoleId(): string | null {
    return this.roleId;
  }
}
