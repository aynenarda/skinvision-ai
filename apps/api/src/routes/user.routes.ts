import { Router } from "express";

import { UserController } from "../controllers/user.controller.js";
import { asyncHandler } from "../middlewares/async-handler.js";
import { PrismaUserRepository } from "../repositories/prisma-user.repository.js";
import { UserService } from "../services/user.service.js";

// Bağımlılıkları burada "elle" birbirine bağlıyoruz (manual dependency
// injection). Proje büyürse bir DI container (örn. tsyringe) kullanılabilir,
// ama bu ölçekte açık ve okunabilir olması yeterli.
//
// Dikkat: Az önce burada `InMemoryUserRepository` vardı. Şimdi
// `PrismaUserRepository` ile değiştirdik -- UserService, UserController,
// route tanımları (aşağıdaki satırlar) HİÇ DEĞİŞMEDİ. Bu, Dependency
// Inversion Principle'ın sağladığı somut fayda: üst katmanlar (service,
// controller) somut bir implementasyona değil, soyut bir interface'e
// bağımlı olduğu için, implementasyonu değiştirmek onları etkilemedi.
const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export const userRouter = Router();

userRouter.get("/", asyncHandler(userController.list));
userRouter.get("/:id", asyncHandler(userController.getById));
userRouter.post("/", asyncHandler(userController.create));
