/**
 * "Beklenen" iş mantığı hatalarını (mesela e-posta zaten kayıtlı) generic
 * `Error`'dan ayırmak için kullanılır. Controller katmanı bu tipi yakalayıp
 * doğru HTTP status code'una çevirir; error middleware'e düşmez.
 */
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string
  ) {
    super(message);
    this.name = "AppError";
  }
}
