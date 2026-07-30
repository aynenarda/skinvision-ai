import { GoogleGenAI, Type } from "@google/genai";

import { AppError } from "../errors/app-error.js";
import type {
  Analysis,
  AnalysisRepository,
} from "../repositories/analysis.repository.js";

export interface CreateAnalysisRequest {
  userId: string;
  imageUrl: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const RESULT_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    metrics: {
      type: Type.OBJECT,
      description:
        "Her biri 0 (sorun yok / mükemmel) - 100 (ciddi düzeyde belirgin) arası, cildin fotoğraftan gözlemlenebilen görsel özelliklerine dayalı objektif skorlar.",
      properties: {
        acne: { type: Type.INTEGER },
        redness: { type: Type.INTEGER },
        dryness: { type: Type.INTEGER },
        oiliness: { type: Type.INTEGER },
        evenness: {
          type: Type.INTEGER,
          description: "Ton eşitsizliği / lekelenme düzeyi (0 = tamamen eşit ton)",
        },
        texture: {
          type: Type.INTEGER,
          description: "Yüzey pürüzlülüğü / gözenek belirginliği (0 = pürüzsüz)",
        },
      },
      required: ["acne", "redness", "dryness", "oiliness", "evenness", "texture"],
    },
    overallScore: {
      type: Type.INTEGER,
      description:
        "0-100 arası genel cilt sağlığı skoru; metrics alanındaki değerlerin ağırlıklı ortalamasına dayanmalı (yüksek skor = daha sağlıklı cilt).",
    },
    observations: {
      type: Type.ARRAY,
      description:
        "Fotoğrafta doğrudan gözlemlenen, ölçülebilir/tarif edilebilir bulgular (öznel yorum değil).",
      items: { type: Type.STRING },
    },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          rationale: {
            type: Type.STRING,
            description:
              "Önerinin dermatolojik/bilimsel gerekçesi -- hangi gözleme dayandığı.",
          },
          category: {
            type: Type.STRING,
            enum: ["cilt_bakimi", "beslenme", "yasam_tarzi", "profesyonel_yardim"],
          },
        },
        required: ["title", "rationale", "category"],
      },
    },
    disclaimer: {
      type: Type.STRING,
      description:
        "Bunun bir tıbbi teşhis olmadığını, ciddi/kalıcı sorunlarda dermatoloğa başvurulması gerektiğini belirten kısa not.",
    },
  },
  required: [
    "metrics",
    "overallScore",
    "observations",
    "recommendations",
    "disclaimer",
  ],
};

const SYSTEM_PROMPT = `Sen bir cilt görüntüsü analiz sistemisin. Sana verilen yüz fotoğrafını objektif, ölçülebilir ve bilimsel bir yaklaşımla değerlendir.

Kurallar:
- Skorları kişisel beğeniye değil, gözlemlenebilir görsel kanıta (kızarıklık yaygınlığı, lezyon sayısı/boyutu, parlaklık/mat alan dağılımı, ton farklılıkları, yüzey dokusu) dayandır.
- Tıbbi teşhis koyma; bu bir dermatolojik muayene değildir, sadece görsel bir ön değerlendirmedir.
- Önerileri genel, kanıta dayalı cilt bakımı prensiplerine (nemlendirme, güneş koruması, nazik temizlik vb.) dayandır; ilaç veya reçeteli tedavi önerme.
- Fotoğrafta yüz net seçilmiyorsa veya analiz için yetersizse, bunu observations alanında açıkça belirt ve skorları buna göre temkinli ver.
- Tüm metinleri Türkçe yaz.`;

function parseDataUrl(dataUrl: string): { mimeType: string; data: string } {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl);
  if (!match) {
    throw new AppError(
      400,
      "INVALID_IMAGE",
      "imageUrl must be a base64-encoded image data URL"
    );
  }
  return { mimeType: match[1], data: match[2] };
}

interface AnalysisResult {
  metrics: {
    acne: number;
    redness: number;
    dryness: number;
    oiliness: number;
    evenness: number;
    texture: number;
  };
  overallScore: number;
  observations: string[];
  recommendations: {
    title: string;
    rationale: string;
    category: string;
  }[];
  disclaimer: string;
}

export class AnalysisService {
  constructor(private readonly analysisRepository: AnalysisRepository) {}

  async createAnalysis(input: CreateAnalysisRequest): Promise<Analysis> {
    const image = parseDataUrl(input.imageUrl);

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: image.mimeType, data: image.data } },
            {
              text: "Bu fotoğraftaki cildi yukarıdaki kurallara göre analiz et.",
            },
          ],
        },
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: RESULT_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) {
      throw new AppError(
        502,
        "AI_ANALYSIS_FAILED",
        "Analiz motorundan geçerli bir yanıt alınamadı"
      );
    }

    const result = JSON.parse(text) as AnalysisResult;

    return this.analysisRepository.create({
      userId: input.userId,
      imageUrl: input.imageUrl,
      overallScore: result.overallScore,
      status: "COMPLETED",
      results: result,
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
