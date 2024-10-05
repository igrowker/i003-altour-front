"use client";
//permite manejar la sesion en el frontend. Para saber si el usuario está autenticado.
import { SessionProvider } from "next-auth/react";
import UserProvider from "./store/userProvider";  // Importa el UserProvider de Zustand

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>{children}</UserProvider>  {/* Provee tanto la sesión como el estado de usuario */}
    </SessionProvider>
  );
}

