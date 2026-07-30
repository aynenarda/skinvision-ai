import type { NextFunction, Request, Response } from "express";

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

/**
 * Express 4, async fonksiyon içinde fırlatılan (throw edilen) veya reject
 * olan Promise'leri OTOMATİK yakalamaz — sessizce "unhandled rejection"
 * olarak kalır, error middleware hiç tetiklenmez. (Express 5'te bu
 * otomatik hale geldi, ama biz 4 kullanıyoruz.) Bu wrapper, controller'ı
 * try/catch ile kirletmeden hatayı `next(err)` ile error middleware'e taşır.
 */
export function asyncHandler(handler: AsyncRequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
}
