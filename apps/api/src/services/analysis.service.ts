import { AppError } from "../errors/app-error.js";
import type {
  Analysis,
  AnalysisRepository,
} from "../repositories/analysis.repository.js";

export interface CreateAnalysisRequest {
  userId: string;
  imageUrl: string;
}

export class AnalysisService {
  constructor(private readonly analysisRepository: AnalysisRepository) {}

  /**
   * Gerçek görüntü işleme/AI modeli henüz kurulmadı. Ürün akışının uçtan
   * uca çalışabilmesi için burada sahte (mock) bir skor üretiyoruz --
   * gerçek model geldiğinde sadece bu metodun içi değişecek, repository/
   * controller/route katmanları etkilenmeyecek.
   */
  async createAnalysis(input: CreateAnalysisRequest): Promise<Analysis> {
    const overallScore = Math.floor(Math.random() * 41) + 60; // 60-100
    const results = {
      acne: Math.floor(Math.random() * 100),
      redness: Math.floor(Math.random() * 100),
      dryness: Math.floor(Math.random() * 100),
      note: "Mock sonuç -- gerçek AI analiz motoru henüz entegre edilmedi.",
    };

    return this.analysisRepository.create({
      userId: input.userId,
      imageUrl: input.imageUrl,
      overallScore,
      status: "COMPLETED",
      results,
    });
  }

  async listForUser(userId: string): Promise<Analysis[]> {
    return this.analysisRepository.findAllByUser(userId);
  }

  async getForUser(id: string, userId: string): Promise<Analysis> {
    const analysis = await this.analysisRepository.findById(id);
    if (!analysis || analysis.userId !== userId) {
      throw new AppError(404, "ANALYSIS_NOT_FOUND", `Analysis ${id} not found`);
    }
    return analysis;
  }
}
