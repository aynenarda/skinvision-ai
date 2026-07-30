import { clerkMiddleware } from "@clerk/nextjs/server";

// Şimdilik hiçbir route'u zorla korumuyoruz -- landing page tamamen açık.
// Dashboard modülünü kurduğumuzda buraya `createRouteMatcher` ile
// "/dashboard(.*)" gibi korumalı route tanımları ekleyeceğiz.
export default clerkMiddleware();

export const config = {
  matcher: [
    // Next.js'in kendi statik dosyalarını ve _next içeriğini middleware'den muaf tut
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
