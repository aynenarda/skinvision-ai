const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface Analysis {
  id: string;
  userId: string;
  imageUrl: string;
  overallScore: number | null;
  status: "PENDING" | "COMPLETED" | "FAILED";
  results: {
    metrics: {
      acne: number;
      redness: number;
      dryness: number;
      oiliness: number;
      evenness: number;
      texture: number;
    };
    observations: string[];
    recommendations: {
      title: string;
      rationale: string;
      category: string;
    }[];
    disclaimer: string;
  } | null;
  createdAt: string;
}

async function request<T>(
  path: string,
  token: string | null,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed with ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function createAnalysis(token: string | null, imageDataUrl: string) {
  return request<Analysis>("/analyses", token, {
    method: "POST",
    body: JSON.stringify({ imageUrl: imageDataUrl }),
  });
}

export function listAnalyses(token: string | null) {
  return request<Analysis[]>("/analyses", token);
}

export function getAnalysis(token: string | null, id: string) {
  return request<Analysis>(`/analyses/${id}`, token);
}
