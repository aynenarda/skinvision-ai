import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Tekil (singleton) örnek: uygulama boyunca tek bir PrismaClient / connection
// pool paylaşılır. Her repository/service ayrı ayrı `new PrismaClient()`
// yaparsa, her biri kendi bağlantı havuzunu açar -- veritabanı bağlantı
// limitini gereksiz yere tüketir.
export const prisma = new PrismaClient({ adapter });
