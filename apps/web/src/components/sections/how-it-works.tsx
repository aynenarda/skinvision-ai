"use client";

import { motion } from "motion/react";
import { Camera, ScanSearch, Sparkles } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Camera,
    title: "Kameranı Aç",
    description:
      "Tarayıcından kameraya erişim izni ver. Yüzünüzü çerçeveye yerleştirin — ışık ve açı yetersizse anında uyarılırsınız.",
  },
  {
    number: "02",
    icon: ScanSearch,
    title: "AI Analiz Etsin",
    description:
      "Yüz doğru pozisyona geldiğinde analiz otomatik başlar. 468 yüz noktası ve cilt metrikleri saniyeler içinde işlenir.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Raporunu Al",
    description:
      "Skorlarınızı, radar chart'ınızı ve cilt tipinize özel bakım, ürün ve beslenme önerilerinizi görün.",
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

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28">
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
            Üç adımda, saniyeler içinde
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.1}
            variants={fadeUp}
            className="mt-4 text-muted-foreground"
          >
            Kayıt olmaktan rapor almaya kadar tüm süreç bir dakikadan az sürer.
          </motion.p>
        </div>

        <div className="relative mt-20 grid gap-12 sm:grid-cols-3 sm:gap-6">
          <div
            aria-hidden
            className="absolute top-6 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent sm:block"
          />

          {STEPS.map(({ number, icon: Icon, title, description }, index) => (
            <motion.div
              key={number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={index * 0.12}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <div className="relative flex size-12 items-center justify-center rounded-full border border-border bg-background">
                <Icon className="size-5 text-accent-violet" />
              </div>
              <span className="mt-4 font-mono text-xs text-muted-foreground">
                {number}
              </span>
              <h3 className="mt-2 font-semibold text-foreground">{title}</h3>
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
