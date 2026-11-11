import { auth } from "@/auth";
import { NextResponse } from "next/server";


export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/login", req.url);

    const requestedPath =
      req.nextUrl.pathname + req.nextUrl.search;

    loginUrl.searchParams.set("redirectTo", requestedPath);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

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

