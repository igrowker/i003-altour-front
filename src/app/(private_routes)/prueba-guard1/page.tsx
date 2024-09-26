"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PruebaGuard1() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (data.user) {
        setSession(data.user); // Establece la sesión
      } else {
        setSession(null); // No hay sesión
      }
      setLoading(false); // Cambia el estado de carga
    };

    fetchSession();
  }, []);

  // Mostrar un loading mientras verificamos la sesión
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirigir si no hay sesión
  if (!session) {
    if (!session) {
        setTimeout(() => {
          router.push("/login");
        }, 3000); 
    return <div> <p>Inicia sesión para disfrutar de todo lo que te ofrece Altour.</p> </div>; 
  }
}
  return (
    <div>
      <h1>Bienvenido a la página protegida Prueba Guard 1</h1>
      <p>Solo puedes ver esto si estás autenticado.</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
