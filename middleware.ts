import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  if (pathname === "/") {
    url.pathname = "/home.html";
    return NextResponse.rewrite(url);
  }

  if (pathname === "/2d") {
    url.pathname = "/plan-2d.html";
    return NextResponse.rewrite(url);
  }

  if (pathname === "/3d") {
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent);
    url.pathname = isMobile ? "/mobile.html" : "/desktop.html";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/2d", "/3d"],
};
