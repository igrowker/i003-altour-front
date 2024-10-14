//import { withAuth } from 'next-auth/middleware';

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// Definir las rutas protegidas
// obtener el token de autenticación
// comprobar si la pág. es de autenticación (login/register)

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");
  // Si el usuario ya está autenticado y está intentando acceder a login o register, redirigir a home
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // Permitir que la solicitud continúe si está autenticado
  return NextResponse.next();
}

// Definir las rutas que deben pasar por el middleware
export const config = {
  //TODO: añadir las rutas que quieras proteger solo para usuarios logueados:
  matcher: ["/prueba-guard1/:path*", "/prueba-guard2/:path*"], // Rutas protegidas
};
