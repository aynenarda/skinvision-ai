import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkinVision AI — Yapay Zeka Destekli Cilt Analizi",
  description:
    "Kameranızla saniyeler içinde cilt analizi yapın. Akne, kızarıklık, kuruluk ve daha fazlasını ölçün; cilt tipinize özel bakım ve beslenme önerileri alın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#7c5cfc",
          colorBackground: "#131320",
          colorText: "#f5f5f7",
          colorTextSecondary: "#8b8b99",
          colorTextOnPrimaryBackground: "#ffffff",
          colorInputBackground: "#1c1c2a",
          colorInputText: "#f5f5f7",
          colorNeutral: "#f5f5f7",
          colorDanger: "#ef4444",
          borderRadius: "0.75rem",
        },
        // `@clerk/themes`'in `dark` preset'i, bu Clerk sürümüyle (v7) CSS
        // değişkenlerini doğru enjekte etmiyor -- ölçüm yaparak tespit
        // ettiğimiz, kontrastı bozuk elementleri burada elle düzeltiyoruz.
        elements: {
          headerTitle: { color: "#f5f5f7" },
          headerSubtitle: { color: "#8b8b99" },
          formFieldLabel: { color: "#f5f5f7" },
          dividerText: { color: "#8b8b99" },
          footerActionText: { color: "#8b8b99" },
          footer: { color: "#8b8b99" },
          socialButtonsBlockButtonText: { color: "#f5f5f7" },
        },
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
