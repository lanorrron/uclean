import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createClient from "@/lib/supabase/server"; // ESTE

export async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const path = req.nextUrl.pathname;
  const protectedPaths = ["/dashboard", "/settings", "/wallets", "/payments", "/organization/members", "/charge", "developers"];
  const authPaths = ["/login", "/register", "/forgot-password"];

  const isProtected = protectedPaths.some((p) => path.startsWith(p));
  const isAuthPath = authPaths.some((p) => path.startsWith(p));

  if (isProtected && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  if (isAuthPath && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/wallets/:path*",
    "/payments/:path*",
    "/organization/:path*",
    "/charge/:path*",
    "/developers/:path*",

    "/login",
    "/register",
    "/forgot-password",
  ],
};
