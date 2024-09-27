"use client";
//permite manejar la sesion en el frontend. Para saber si el usuario está autenticado.
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

