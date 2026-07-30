export type AnalysisStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface Analysis {
  id: string;
  userId: string;
  imageUrl: string;
  overallScore: number | null;
  status: AnalysisStatus;
  results: unknown;
  createdAt: Date;
}

export interface CreateAnalysisInput {
  userId: string;
  imageUrl: string;
  overallScore: number | null;
  status: AnalysisStatus;
  results: unknown;
}

export interface AnalysisRepository {
  create(input: CreateAnalysisInput): Promise<Analysis>;
  findAllByUser(userId: string): Promise<Analysis[]>;
  findById(id: string): Promise<Analysis | null>;
}
