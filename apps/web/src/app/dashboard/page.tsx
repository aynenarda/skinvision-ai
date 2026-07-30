import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, History, ScanFace, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName ?? "orada";

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Merhaba, {firstName} 👋
      </h1>
      <p className="mt-2 text-muted-foreground">
        Cildinizin güncel durumunu görmek için yeni bir analiz başlatın.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card/50 p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <History className="size-4" />
            <span className="text-sm">Toplam Analiz</span>
          </div>
          <p className="mt-3 text-2xl font-semibold">0</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/50 p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="size-4" />
            <span className="text-sm">Genel Skor</span>
          </div>
          <p className="mt-3 text-2xl font-semibold">—</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/50 p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ScanFace className="size-4" />
            <span className="text-sm">Son Analiz</span>
          </div>
          <p className="mt-3 text-2xl font-semibold">—</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card/50 p-8 text-center">
        <p className="text-muted-foreground">
          Henüz bir analiziniz yok. İlk analizinizi başlatarak cilt sağlığı
          raporunuzu görün.
        </p>
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href="/dashboard/new-analysis" />}
          className="mt-4 gap-2 bg-gradient-to-r from-accent-violet to-accent-cyan text-white hover:opacity-90"
        >
          Yeni Analiz Başlat
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
