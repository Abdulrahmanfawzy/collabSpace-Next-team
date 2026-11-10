import { NextResponse, type NextRequest } from "next/server";

import { AUTH_TOKEN_COOKIE } from "@/features/auth/constants/auth.constants";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;

  if (token) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);

  const requestedPath = request.nextUrl.pathname + request.nextUrl.search;

  loginUrl.searchParams.set("redirectTo", requestedPath);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/",
    "/chats/:path*",
    "/edit/:path*",
    "/meetings/:path*",
    "/profile/:path*",
    "/projects/:path*",
    "/tasks/:path*",
  ],
};
