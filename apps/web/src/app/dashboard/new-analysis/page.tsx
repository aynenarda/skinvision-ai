"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Camera, ImageUp, Loader2, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createAnalysis } from "@/lib/api";

type Stage = "idle" | "camera" | "preview" | "submitting";

export default function NewAnalysisPage() {
  const router = useRouter();
  const { getToken } = useAuth();

  const [stage, setStage] = useState<Stage>("idle");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // `<video>` elementi ancak `stage === "camera"` olduğunda DOM'a giriyor,
  // yani `getUserMedia` sonucu geldiğinde ref henüz null olabilir. Akışı
  // stream/videoRef ikisi de hazır olunca bu effect'te bağlıyoruz --
  // ayrıca bazı tarayıcılar `autoPlay`'e rağmen `play()` çağrısı istiyor.
  useEffect(() => {
    if (stage !== "camera" || !stream || !videoRef.current) return;
    const video = videoRef.current;
    video.srcObject = stream;
    video.play().catch(() => {});
  }, [stage, stream]);

  async function startCamera() {
    setError(null);
    try {
      let media: MediaStream;
      try {
        media = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
      } catch {
        // Bazı masaüstü kameraları "facingMode" kısıtını desteklemiyor
        // (OverconstrainedError) -- kısıtsız tekrar dene.
        media = await navigator.mediaDevices.getUserMedia({ video: true });
      }
      setStream(media);
      setStage("camera");
    } catch {
      setError(
        "Kameraya erişilemedi. Tarayıcı izinlerini kontrol edin veya bir fotoğraf yükleyin."
      );
    }
  }

  function stopCamera() {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
  }

  function capturePhoto() {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    setCapturedImage(canvas.toDataURL("image/jpeg", 0.85));
    stopCamera();
    setStage("preview");
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCapturedImage(reader.result as string);
      setStage("preview");
    };
    reader.readAsDataURL(file);
  }

  function reset() {
    setCapturedImage(null);
    setError(null);
    setStage("idle");
  }

  async function submitAnalysis() {
    if (!capturedImage) return;
    setStage("submitting");
    setError(null);
    try {
      const token = await getToken();
      const analysis = await createAnalysis(token, capturedImage);
      router.push(`/dashboard/history?highlight=${analysis.id}`);
    } catch {
      setError("Analiz gönderilirken bir hata oluştu. Tekrar deneyin.");
      setStage("preview");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Yeni Analiz</h1>
      <p className="mt-2 text-muted-foreground">
        Kameranızla bir fotoğraf çekin veya cihazınızdan yükleyin, cilt
        analiziniz saniyeler içinde hazırlansın.
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-12 text-center">
        {stage === "idle" && (
          <>
            <Camera className="size-8 text-muted-foreground" />
            <p className="text-muted-foreground">
              Analiz başlatmak için bir fotoğraf gerekiyor.
            </p>
            <div className="flex gap-3">
              <Button onClick={startCamera} className="gap-2">
                <Camera className="size-4" />
                Kamerayı Aç
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                render={<label />}
                className="gap-2"
              >
                <ImageUp className="size-4" />
                Fotoğraf Yükle
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </Button>
            </div>
          </>
        )}

        {stage === "camera" && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="aspect-square w-full max-w-sm rounded-xl bg-black object-cover"
            />
            <div className="flex gap-3">
              <Button onClick={capturePhoto} className="gap-2">
                <Camera className="size-4" />
                Fotoğraf Çek
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  stopCamera();
                  reset();
                }}
              >
                İptal
              </Button>
            </div>
          </>
        )}

        {(stage === "preview" || stage === "submitting") && capturedImage && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={capturedImage}
              alt="Yakalanan fotoğraf önizlemesi"
              className="aspect-square w-full max-w-sm rounded-xl object-cover"
            />
            <div className="flex gap-3">
              <Button
                onClick={submitAnalysis}
                disabled={stage === "submitting"}
                className="gap-2 bg-gradient-to-r from-accent-violet to-accent-cyan text-white hover:opacity-90"
              >
                {stage === "submitting" && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Analizi Başlat
              </Button>
              <Button
                variant="outline"
                onClick={reset}
                disabled={stage === "submitting"}
                className="gap-2"
              >
                <RotateCcw className="size-4" />
                Yeniden Çek
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
