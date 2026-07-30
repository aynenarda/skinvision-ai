"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Gizlilik Öncelikli" },
  { icon: Zap, label: "Anında Sonuç" },
  { icon: Sparkles, label: "Klinik Düzeyde Analiz" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-[-10%] left-1/4 size-[500px] rounded-full bg-accent-violet/40 blur-[120px] animate-glow-a" />
        <div className="absolute top-[10%] right-1/5 size-[420px] rounded-full bg-accent-cyan/30 blur-[120px] animate-glow-b" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.span
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
        >
          <Sparkles className="size-3.5 text-accent-cyan" />
          Yapay Zeka Destekli Cilt Analizi
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.1}
          variants={fadeUp}
          className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl"
        >
          Cildinizi{" "}
          <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
            saniyeler içinde
          </span>{" "}
          analiz edin
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg text-muted-foreground text-balance"
        >
          Kameranızı açın, yapay zeka yüzünüzü analiz etsin. Akne, kızarıklık,
          kuruluk, kırışıklık ve daha fazlasını saniyeler içinde ölçer;
          cilt tipinize özel bakım, ürün ve beslenme önerileriyle bir aksiyon
          planı sunar.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.3}
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/register" />}
            className="group h-12 gap-2 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-8 text-base text-white hover:opacity-90"
          >
            Ücretsiz Analizi Başlat
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="#how-it-works" />}
            className="h-12 rounded-full px-8 text-base"
          >
            Nasıl Çalışır?
          </Button>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.4}
          variants={fadeUp}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Icon className="size-4 text-accent-violet" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
