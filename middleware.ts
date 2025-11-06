import { clerkMiddleware } from "@clerk/nextjs/server";

// TEMP DEBUG LOGS - remove after verification
console.log("[middleware] has CLERK_PUBLISHABLE_KEY:", !!process.env.CLERK_PUBLISHABLE_KEY);
console.log("[middleware] has CLERK_SECRET_KEY:", !!process.env.CLERK_SECRET_KEY);

// TEMP FALLBACK: derive server key from NEXT_PUBLIC if missing
if (!process.env.CLERK_PUBLISHABLE_KEY && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  process.env.CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  console.log("[middleware] filled CLERK_PUBLISHABLE_KEY from NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
}

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};
