"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, LayoutDashboard, ScanFace, Sparkles, User } from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Genel Bakış", href: "/dashboard", icon: LayoutDashboard },
  { label: "Yeni Analiz", href: "/dashboard/new-analysis", icon: ScanFace },
  { label: "Geçmiş", href: "/dashboard/history", icon: History },
  { label: "Profil", href: "/dashboard/profile", icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border px-4 py-6 md:flex">
      <Link href="/" className="flex items-center gap-2 px-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-violet to-accent-cyan">
          <Sparkles className="size-4 text-white" />
        </span>
        <span className="text-sm font-semibold tracking-tight text-foreground">
          SkinVision AI
        </span>
      </Link>

      <nav className="mt-10 flex flex-col gap-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          // Tam eşleşme /dashboard'da gerekiyor (aksi halde her alt sayfada
          // da "Genel Bakış" aktif görünürdü, çünkü her path "/dashboard" ile başlıyor)
          const isActive =
            href === "/dashboard" ? pathname === href : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
