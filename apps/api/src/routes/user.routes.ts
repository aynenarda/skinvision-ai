import { Router } from "express";

import { UserController } from "../controllers/user.controller.js";
import { asyncHandler } from "../middlewares/async-handler.js";
import { userService } from "../container.js";

const userController = new UserController(userService);

export const userRouter = Router();

userRouter.get("/", asyncHandler(userController.list));
userRouter.get("/:id", asyncHandler(userController.getById));
userRouter.post("/", asyncHandler(userController.create));
