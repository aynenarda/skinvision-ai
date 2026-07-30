import { auth } from "@clerk/nextjs/server";
import { History } from "lucide-react";

import { listAnalyses } from "@/lib/api";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "İşleniyor",
  COMPLETED: "Tamamlandı",
  FAILED: "Başarısız",
};

const METRIC_LABELS: Record<string, string> = {
  acne: "Akne",
  redness: "Kızarıklık",
  dryness: "Kuruluk",
  oiliness: "Yağlanma",
  evenness: "Ton Eşitsizliği",
  texture: "Doku",
};

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ highlight?: string }>;
}) {
  const { highlight } = await searchParams;
  const { getToken } = await auth();
  const token = await getToken();
  const analyses = await listAnalyses(token).catch(() => []);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Analiz Geçmişi
      </h1>
      <p className="mt-2 text-muted-foreground">
        Bugüne kadar yaptığınız tüm analizler burada listelenecek.
      </p>

      {analyses.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
          <History className="size-8 text-muted-foreground" />
          <p className="text-muted-foreground">Henüz bir analiz kaydınız yok.</p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className={`rounded-2xl border p-5 ${
                analysis.id === highlight
                  ? "border-accent-violet/50 bg-accent-violet/5"
                  : "border-border bg-card/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {new Date(analysis.createdAt).toLocaleString("tr-TR")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {STATUS_LABELS[analysis.status] ?? analysis.status}
                  </p>
                </div>
                <p className="text-2xl font-semibold">
                  {analysis.overallScore ?? "—"}
                </p>
              </div>

              {analysis.results?.metrics && (
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(analysis.results.metrics).map(
                      ([key, value]) => (
                        <span
                          key={key}
                          className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                        >
                          {METRIC_LABELS[key] ?? key}: {value}
                        </span>
                      )
                    )}
                  </div>

                  {(analysis.results.observations?.length ?? 0) > 0 && (
                    <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                      {analysis.results.observations.map((obs, i) => (
                        <li key={i}>{obs}</li>
                      ))}
                    </ul>
                  )}

                  {(analysis.results.recommendations?.length ?? 0) > 0 && (
                    <div className="mt-3 flex flex-col gap-2">
                      {analysis.results.recommendations.map((rec, i) => (
                        <div
                          key={i}
                          className="rounded-lg bg-muted/50 p-3 text-sm"
                        >
                          <p className="font-medium">{rec.title}</p>
                          <p className="mt-0.5 text-muted-foreground">
                            {rec.rationale}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {analysis.results.disclaimer && (
                    <p className="mt-3 text-xs text-muted-foreground/70">
                      {analysis.results.disclaimer}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
