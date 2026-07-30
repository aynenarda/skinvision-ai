"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Özellikler", href: "#features" },
  { label: "Nasıl Çalışır", href: "#how-it-works" },
  { label: "SSS", href: "#faq" },
];

interface NavbarProps {
  // Server Component olarak render edilip buraya geçirilir (bkz. AuthNavLinks)
  authSlot: React.ReactNode;
}

export function Navbar({ authSlot }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-violet to-accent-cyan">
            <Sparkles className="size-4 text-white" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            SkinVision AI
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">{authSlot}</div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="flex size-9 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-label="Menüyü aç/kapat"
        >
          {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col items-start gap-2">{authSlot}</div>
          </div>
        </div>
      )}
    </header>
  );
}
