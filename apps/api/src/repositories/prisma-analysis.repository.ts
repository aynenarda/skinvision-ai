import type { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import type {
  Analysis,
  AnalysisRepository,
  CreateAnalysisInput,
} from "./analysis.repository.js";

export class PrismaAnalysisRepository implements AnalysisRepository {
  async create(input: CreateAnalysisInput): Promise<Analysis> {
    return prisma.analysis.create({
      data: {
        ...input,
        results: input.results as Prisma.InputJsonValue,
      },
    });
  }

  async findAllByUser(userId: string): Promise<Analysis[]> {
    return prisma.analysis.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<Analysis | null> {
    return prisma.analysis.findUnique({ where: { id } });
  }
}
