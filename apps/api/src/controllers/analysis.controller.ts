import type { Request, Response } from "express";
import { z } from "zod";

import type { AnalysisService } from "../services/analysis.service.js";

const createAnalysisSchema = z.object({
  imageUrl: z.string().min(1, "imageUrl is required"),
});

export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const parsed = createAnalysisSchema.parse(req.body);
    const analysis = await this.analysisService.createAnalysis({
      userId: req.dbUser!.id,
      imageUrl: parsed.imageUrl,
    });
    res.status(201).json(analysis);
  };

  list = async (req: Request, res: Response): Promise<void> => {
    const analyses = await this.analysisService.listForUser(req.dbUser!.id);
    res.status(200).json(analyses);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const analysis = await this.analysisService.getForUser(
      req.params.id,
      req.dbUser!.id
    );
    res.status(200).json(analysis);
  };
}
