export class User {
  constructor(
    public readonly id: string,
    private name: string,
    private email: string,
  ) {}

  static create(id: string, name: string, email: string): User {
    if (!email.includes('@')) {
      throw new Error('Invalid email');
    }

    return new User(id, name, email);
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }
}
