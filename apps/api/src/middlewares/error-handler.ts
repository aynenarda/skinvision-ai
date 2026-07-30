import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { AppError } from "../errors/app-error.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.code, message: err.message });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({ error: "VALIDATION_ERROR", details: err.flatten() });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
}
