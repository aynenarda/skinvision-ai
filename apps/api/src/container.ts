import { PrismaAnalysisRepository } from "./repositories/prisma-analysis.repository.js";
import { PrismaUserRepository } from "./repositories/prisma-user.repository.js";
import { AnalysisService } from "./services/analysis.service.js";
import { UserService } from "./services/user.service.js";

// Uygulama genelinde paylaşılan (manuel DI) servis örnekleri. Birden fazla
// route dosyası aynı `UserService` örneğine ihtiyaç duyuyor (ör. auth
// senkronizasyonu), bu yüzden burada tek bir yerde kuruluyor.
const userRepository = new PrismaUserRepository();
export const userService = new UserService(userRepository);

const analysisRepository = new PrismaAnalysisRepository();
export const analysisService = new AnalysisService(analysisRepository);
