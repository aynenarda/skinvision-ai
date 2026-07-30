import type { NextFunction, Request, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";

import { AppError } from "../errors/app-error.js";
import type { User } from "../repositories/user.repository.js";
import type { UserService } from "../services/user.service.js";

declare global {
  namespace Express {
    interface Request {
      dbUser?: User;
    }
  }
}

/**
 * `clerkMiddleware()`'dan SONRA çalışmalı (bkz. `index.ts`). Bu, saf bir
 * JSON API olduğu için Clerk'in `requireAuth()` yardımcısını KULLANMIYORUZ
 * -- o, doğrulanmamış istekleri sign-in sayfasına 302 ile yönlendiriyor
 * (deprecated, tarayıcı tabanlı akışlar için tasarlanmış). Bunun yerine
 * `getAuth()` ile oturumu kontrol edip yoksa 401 JSON hatası dönüyoruz.
 */
export function ensureSyncedUser(userService: UserService) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);
    if (!userId) {
      next(new AppError(401, "UNAUTHENTICATED", "Authentication required"));
      return;
    }

    try {
      const clerkUser = await clerkClient.users.getUser(userId);
      const primaryEmail = clerkUser.emailAddresses.find(
        (e) => e.id === clerkUser.primaryEmailAddressId
      )?.emailAddress;

      const name =
        [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
        primaryEmail ||
        "İsimsiz Kullanıcı";

      req.dbUser = await userService.syncFromClerk({
        clerkId: userId,
        name,
        email: primaryEmail ?? `${userId}@unknown.local`,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
}
