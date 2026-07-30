import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Analiz Geçmişi
      </h1>
      <p className="mt-2 text-muted-foreground">
        Bugüne kadar yaptığınız tüm analizler burada listelenecek.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
        <History className="size-8 text-muted-foreground" />
        <p className="text-muted-foreground">Henüz bir analiz kaydınız yok.</p>
      </div>
    </div>
  );
}
