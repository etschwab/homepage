import { NextResponse, type NextRequest } from "next/server";

import { getAdminCookieName } from "@/lib/auth/constants";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAdminCookie = Boolean(
    request.cookies.get(getAdminCookieName())?.value,
  );

  // Die Login-Seiten prüfen die Session selbst. Hier nur anhand des Cookies
  // weiterzuleiten würde mit einem ungültigen Cookie das Login blockieren.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Der Admin-Bereich hat ein eigenes Login; das Dokumenten-Login reicht nicht.
  if (pathname.startsWith("/admin") && !hasAdminCookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
