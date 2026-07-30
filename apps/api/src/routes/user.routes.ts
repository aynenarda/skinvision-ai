import { Router } from "express";

import { UserController } from "../controllers/user.controller.js";
import { asyncHandler } from "../middlewares/async-handler.js";
import { InMemoryUserRepository } from "../repositories/user.repository.js";
import { UserService } from "../services/user.service.js";

// Bağımlılıkları burada "elle" birbirine bağlıyoruz (manual dependency
// injection). Proje büyürse bir DI container (örn. tsyringe) kullanılabilir,
// ama bu ölçekte açık ve okunabilir olması yeterli.
const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export const userRouter = Router();

userRouter.get("/", asyncHandler(userController.list));
userRouter.get("/:id", asyncHandler(userController.getById));
userRouter.post("/", asyncHandler(userController.create));
