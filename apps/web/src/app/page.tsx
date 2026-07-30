import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthNavLinks } from "@/components/layout/auth-nav-links";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FAQ } from "@/components/sections/faq";

export default function Home() {
  return (
    <>
      <Navbar authSlot={<AuthNavLinks />} />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
