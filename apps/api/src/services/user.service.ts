import { AppError } from "../errors/app-error.js";
import type {
  CreateUserInput,
  User,
  UserRepository,
} from "../repositories/user.repository.js";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async listUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND", `User ${id} not found`);
    }
    return user;
  }

  async registerUser(input: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new AppError(
        409,
        "EMAIL_ALREADY_EXISTS",
        `A user with email ${input.email} already exists`
      );
    }
    return this.userRepository.create(input);
  }

  /**
   * Clerk üzerinden kimliği doğrulanmış bir kullanıcı ilk kez API'ye istek
   * attığında, karşılık gelen `User` satırı Postgres'te henüz yoksa burada
   * oluşturulur ("lazy sync" -- webhook yerine istek anında senkronizasyon).
   */
  async syncFromClerk(input: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByClerkId(
      input.clerkId
    );
    if (existingUser) {
      return existingUser;
    }
    return this.userRepository.create(input);
  }
}
