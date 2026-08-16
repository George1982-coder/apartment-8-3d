import { NextRequest, NextResponse } from "next/server";

// Runs on Vercel's Edge before any page loads.
// Looks at the visitor's device and silently serves the right
// static HTML file (desktop.html or mobile.html) from /public.
export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent);

  const url = request.nextUrl.clone();
  url.pathname = isMobile ? "/mobile.html" : "/desktop.html";

  return NextResponse.rewrite(url);
}

// Only intercept the homepage. Everything else (the html files
// themselves, fonts, etc.) is served normally.
export const config = {
  matcher: "/",
};
