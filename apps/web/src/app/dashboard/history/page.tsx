import { auth } from "@clerk/nextjs/server";
import { History } from "lucide-react";

import { listAnalyses } from "@/lib/api";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "İşleniyor",
  COMPLETED: "Tamamlandı",
  FAILED: "Başarısız",
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
        <div className="mt-8 flex flex-col gap-3">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className={`flex items-center justify-between rounded-2xl border p-5 ${
                analysis.id === highlight
                  ? "border-accent-violet/50 bg-accent-violet/5"
                  : "border-border bg-card/50"
              }`}
            >
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
          ))}
        </div>
      )}
    </div>
  );
}
