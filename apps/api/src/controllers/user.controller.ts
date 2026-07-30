import type { Request, Response } from "express";
import { z } from "zod";

import type { UserService } from "../services/user.service.js";

const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export class UserController {
  constructor(private readonly userService: UserService) {}

  list = async (_req: Request, res: Response): Promise<void> => {
    const users = await this.userService.listUsers();
    res.status(200).json(users);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const user = await this.userService.getUser(req.params.id);
    res.status(200).json(user);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const parsed = createUserSchema.parse(req.body);
    const user = await this.userService.registerUser(parsed);
    res.status(201).json(user);
  };
}
