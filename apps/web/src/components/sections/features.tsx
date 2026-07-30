"use client";

import { motion } from "motion/react";
import {
  Activity,
  History,
  Lightbulb,
  Radar,
  ScanFace,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: ScanFace,
    title: "Gerçek Zamanlı Yüz Tespiti",
    description:
      "MediaPipe tabanlı yüz izleme; pozisyon, mesafe ve ışık yetersizse anında uyarır, analiz doğru koşullarda başlar.",
  },
  {
    icon: Activity,
    title: "10+ Cilt Metriği",
    description:
      "Akne, kızarıklık, yağlılık, kuruluk, koyu halka, kırışıklık, gözenek görünürlüğü ve simetri — tek taramada.",
  },
  {
    icon: Lightbulb,
    title: "Kişiselleştirilmiş Öneriler",
    description:
      "Cilt tipinize özel bakım rutini, ürün kategorisi ve beslenme önerileriyle somut bir aksiyon planı sunar.",
  },
  {
    icon: Radar,
    title: "Görsel Skor Raporu",
    description:
      "Radar chart ve ilerleme çubuklarıyla güçlü ve gelişmesi gereken alanları tek bakışta görün.",
  },
  {
    icon: History,
    title: "Zaman İçinde Takip",
    description:
      "Her analiz geçmişe kaydedilir; cildinizin zamanla nasıl değiştiğini karşılaştırmalı olarak izleyin.",
  },
  {
    icon: ShieldCheck,
    title: "Gizlilik Öncelikli",
    description:
      "Yüz tespiti tarayıcınızda çalışır; görüntüleriniz sizin izniniz olmadan asla paylaşılmaz.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
            variants={fadeUp}
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Tek analizde, eksiksiz bir cilt sağlığı görünümü
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.1}
            variants={fadeUp}
            className="mt-4 text-muted-foreground"
          >
            SkinVision AI, klinik düzeyde ölçüm ile günlük hayata uygulanabilir
            öneriler arasındaki boşluğu dolduruyor.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={index * 0.08}
              variants={fadeUp}
              className="group rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-accent-violet/40"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent-violet/20 to-accent-cyan/20">
                <Icon className="size-5 text-accent-violet" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
