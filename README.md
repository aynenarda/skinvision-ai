# SkinVision AI

Yapay zeka destekli cilt analizi uygulaması. Fotoğraf yükleyip Google Gemini
üzerinden objektif, bilimsel gerekçeli bir cilt analizi ve öneri seti alırsın.

## Proje Yapısı

Bu bir pnpm + Turborepo monorepo'su:

- `apps/web` — Next.js frontend (Clerk auth, dashboard, analiz akışı)
- `apps/api` — Express backend (Prisma/PostgreSQL, Gemini vision analizi)

## Gereksinimler

- Node.js 20+
- [pnpm](https://pnpm.io) (bu proje `pnpm@11.18.0` ile test edildi)
- Git

## Kurulum

```bash
git clone <repo-url>
cd skinvision-ai
pnpm install
```

## Kendi Hesaplarını Aç

Projeyi çalıştırmak için üç ücretsiz hesap/servis gerekiyor — bunlar kişisel
olduğu için paylaşılamaz, herkes kendi hesabını açmalı:

1. **Clerk** (kimlik doğrulama) — [clerk.com](https://clerk.com)'da yeni bir
   uygulama oluştur, "API Keys" sayfasından publishable key ve secret key'i al.
2. **Gemini API key** (AI analiz) —
   [aistudio.google.com/apikey](https://aistudio.google.com/apikey)'den kredi
   kartı gerektirmeden ücretsiz bir key oluştur.
3. **PostgreSQL veritabanı** — [Supabase](https://supabase.com) veya
   [Neon](https://neon.tech) gibi bir servisten ücretsiz bir Postgres instance'ı
   aç, bağlantı adresini (`DATABASE_URL`) al.

## Ortam Değişkenleri

### `apps/api/.env`

```env
PORT=4000
DATABASE_URL=
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
GEMINI_API_KEY=
```

### `apps/web/.env.local`

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_API_URL=http://localhost:4000
```

`CLERK_PUBLISHABLE_KEY` / `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` ve
`CLERK_SECRET_KEY` her iki dosyada da **aynı** Clerk uygulamasına ait
değerler olmalı.

## Veritabanını Hazırla

```bash
cd apps/api
pnpm exec prisma migrate deploy
```

## Çalıştır

Kök dizinden:

```bash
pnpm dev
```

Bu komut Turborepo aracılığıyla hem web'i (`http://localhost:3000`) hem de
API'yi (`http://localhost:4000`) aynı anda başlatır.

## Lisans

Bu repo görüntüleme/portföy amacıyla herkese açıktır, ancak kaynak kod
üzerinde tüm haklar saklıdır. Ayrıntılar için [LICENSE](./LICENSE)
dosyasına bakın.
