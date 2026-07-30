import Link from "next/link";
import { Sparkles } from "lucide-react";

const FOOTER_LINKS = {
  Ürün: [
    { label: "Özellikler", href: "#features" },
    { label: "Nasıl Çalışır", href: "#how-it-works" },
    { label: "SSS", href: "#faq" },
  ],
  Hesap: [
    { label: "Giriş Yap", href: "/login" },
    { label: "Kayıt Ol", href: "/register" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-violet to-accent-cyan">
                <Sparkles className="size-4 text-white" />
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                SkinVision AI
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Yapay zeka destekli cilt analizi ve kişiselleştirilmiş bakım
              önerileri.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-foreground">
                {heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SkinVision AI. Tüm hakları saklıdır.</p>
          <p className="max-w-md">
            SkinVision AI tıbbi teşhis aracı değildir; bir dermatoloğun
            görüşünün yerini tutmaz.
          </p>
        </div>
      </div>
    </footer>
  );
}
