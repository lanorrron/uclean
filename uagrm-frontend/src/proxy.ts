// src/proxy.ts (o middleware.ts según tu versión)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 🔥 IMPORTANTE: Usa getUser() para forzar validación del token
  const { data: { user }, error } = await supabase.auth.getUser();
  
  console.log("🔍 PROXY - User:", user?.email || "No user");
  console.log("🔍 PROXY - Error:", error?.message);

  const path = request.nextUrl.pathname;
  
  // Rutas protegidas
  const protectedPaths = ["/dashboard", "/settings", "/wallets", "/payments", "/organization", "/developers", "/reset-password"];
  const authPaths = ["/login", "/register", "/forgot-password"];

  const isProtected = protectedPaths.some((p) => path.startsWith(p));
  const isAuthPath = authPaths.some((p) => path.startsWith(p));

  // Redirigir a login si ruta protegida y no hay usuario
  if (isProtected && !user) {
    console.log("🔒 Redirigiendo a login desde:", path);
    const url = new URL("/login", request.url);
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  // Redirigir a dashboard si está en login con sesión
  if (isAuthPath && user) {
    console.log("✅ Usuario autenticado en login, redirigiendo a dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/wallets/:path*",
    "/payments/:path*",
    "/organization/:path*",
    "/developers/:path*",
    "/reset-password/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};