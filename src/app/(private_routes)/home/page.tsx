"use client";

import Carrusel from "@/app/ui/carrousel";
import Heatmap from "@/app/components/Heatmap/Heatmap";
import { useEffect } from "react";
import { useUserStore } from "@/app/store/userStore";
import { useSession } from "next-auth/react";

import MainLayout from "@/app/components/mainLayout";
import UserPreferencesPage from "@/app/components/preferences/preferences";

import { waffleSoft } from "@/app/ui/fonts";
import { recomendaciones, categorias } from "@/app/lib/places-data";

export default function Home() {
  const { user, isLoggedIn, setToken } = useUserStore();
  const { data: session } = useSession();

  console.log("Access Token:", session?.accessToken);
  // console.log("Access Token:", token);
  console.log("isLoggedIn:", isLoggedIn);

  // Guardar el token en Zustand cuando la sesión es válida
  useEffect(() => {
    if (session?.accessToken) {
      setToken(session.accessToken as string); // Guardamos el accessToken en Zustand
    }
  }, [session, setToken]);

  return (
    <MainLayout>
      <main className="flex min-h-screen flex-col p-6 pb-12 mb-7">
        <div className="flex justify-center text-3xl">
          {isLoggedIn ? (
            <h1>Bienvenido {user?.username}</h1>
          ) : (
            <h1>Bienvenido/a Usuario</h1>
          )}
        </div>
        <div className="flex justify-center mt-5">
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-full h-full">
              <Heatmap
                searchAndCard={false}
                containerStyle={{ width: "100%", height: "200px" }}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className={`${waffleSoft.className} text-2xl pl-4 mb-2`}>
            Recomendaciones
          </h2>
          <Carrusel slides={recomendaciones} />
        </div>
        <div>
          <h2 className={`${waffleSoft.className} text-2xl pl-4 mb-2`}>
            Categorías
          </h2>
          <Carrusel slides={categorias} />
          <UserPreferencesPage />
        </div>
      </main>
    </MainLayout>
  );
}
