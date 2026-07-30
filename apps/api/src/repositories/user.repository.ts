export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
}

/**
 * Servis katmanının bağımlı olduğu sözleşme (contract).
 * Prisma/Postgres implementasyonu geldiğinde bu interface değişmeyecek,
 * sadece yeni bir sınıf bu interface'i implement edecek.
 */
export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(input: CreateUserInput): Promise<User>;
}

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async create(input: CreateUserInput): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      name: input.name,
      email: input.email,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }
}
