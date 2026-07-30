"use client";

import { motion } from "motion/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "SkinVision AI bir tıbbi teşhis aracı mı?",
    answer:
      "Hayır. SkinVision AI, cildinizin görünür özellikleri hakkında bilgilendirici bir öngörü sunar; bir dermatoloğun muayenesinin veya tıbbi teşhisinin yerini tutmaz. Ciddi bir cilt sorununuz varsa mutlaka bir sağlık uzmanına danışın.",
  },
  {
    question: "Yüz verilerim nerede saklanıyor, kiminle paylaşılıyor?",
    answer:
      "Yüz tespiti tarayıcınızda, cihazınızda çalışır. Analiz için kullanılan görüntüler yalnızca hesabınıza bağlı olarak saklanır ve açık izniniz olmadan üçüncü taraflarla paylaşılmaz.",
  },
  {
    question: "Analiz sonuçları ne kadar doğru?",
    answer:
      "Sonuçlar, eğitilmiş görüntü işleme modelleri kullanılarak üretilir ve sürekli iyileştirilir. Ancak her AI sistemi gibi %100 kesinlik iddia etmiyoruz — sonuçları bir referans noktası olarak değerlendirmenizi öneririz.",
  },
  {
    question: "Uygulama ücretsiz mi?",
    answer:
      "Temel analiz ve geçmiş takibi ücretsizdir. İleride sunulabilecek gelişmiş özellikler (uzman danışmanlığı gibi) ayrıca duyurulacaktır.",
  },
  {
    question: "Hangi cihazlarda kullanabilirim?",
    answer:
      "Kamerası olan herhangi bir masaüstü, dizüstü bilgisayar, tablet veya telefon tarayıcısından kullanabilirsiniz. En iyi sonuç için iyi aydınlatılmış bir ortam öneririz.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Sıkça Sorulan Sorular
          </h2>
          <p className="mt-4 text-muted-foreground">
            Aradığın cevabı bulamadıysan bize her zaman ulaşabilirsin.
          </p>
        </motion.div>

        <div className="mt-12 rounded-2xl border border-border bg-card/50 px-6">
          <Accordion>
            {FAQ_ITEMS.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
