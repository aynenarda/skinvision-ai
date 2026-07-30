import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Giriş yapmamış kullanıcıyı otomatik /login'e yönlendirir
    // (redirect URL'e ?redirect_url=/dashboard/... ekleyerek, giriş sonrası
    // kullanıcıyı gitmek istediği sayfaya geri döndürür).
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Next.js'in kendi statik dosyalarını ve _next içeriğini middleware'den muaf tut
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
