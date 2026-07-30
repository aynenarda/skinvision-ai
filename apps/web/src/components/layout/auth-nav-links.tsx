import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

/**
 * Bilinçli olarak "use client" DEĞİL -- Server Component. `Show`, async bir
 * server component olduğu için client component içine doğrudan import
 * edilemez. Bu component, sonucu Navbar'a (client component) bir prop/slot
 * olarak geçirilir.
 */
export function AuthNavLinks() {
  return (
    <>
      <Show when="signed-out">
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/login" />}>
          Giriş Yap
        </Button>
        <Button
          size="sm"
          nativeButton={false}
          render={<Link href="/register" />}
          className="bg-gradient-to-r from-accent-violet to-accent-cyan text-white hover:opacity-90"
        >
          Ücretsiz Başla
        </Button>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </>
  );
}
