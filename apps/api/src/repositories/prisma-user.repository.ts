import { prisma } from "../lib/prisma.js";
import type {
  CreateUserInput,
  User,
  UserRepository,
} from "./user.repository.js";

/**
 * UserRepository interface'inin gerçek veritabanı implementasyonu.
 * InMemoryUserRepository ile aynı sözleşmeyi (interface) uyguladığı için,
 * UserService bu ikisi arasında geçiş yapıldığını hiç bilmez/umursamaz.
 */
export class PrismaUserRepository implements UserRepository {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(input: CreateUserInput): Promise<User> {
    return prisma.user.create({ data: input });
  }
}
