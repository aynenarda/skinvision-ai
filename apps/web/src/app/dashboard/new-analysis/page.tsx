import { Camera } from "lucide-react";

export default function NewAnalysisPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Yeni Analiz</h1>
      <p className="mt-2 text-muted-foreground">
        Kamera ve yüz tespiti modülünü sıradaki adımda burada kuracağız.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
        <Camera className="size-8 text-muted-foreground" />
        <p className="text-muted-foreground">
          Kamera modülü henüz hazır değil — bir sonraki adımda geliyor.
        </p>
      </div>
    </div>
  );
}
