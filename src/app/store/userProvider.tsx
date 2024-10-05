"use client";
import { useUserStore } from "./userStore";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRequest } from "@/app/hooks/useRequest";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useUserStore();
  const { setToken } = useUserStore();
  const { data: session, status } = useSession();
  const { apiFetch } = useRequest();

  useEffect(() => {
    //TODO: Si no hay sesión. Falta fijar una acción
    if (!session || !session.accessToken) {
      console.log("Token no disponible");
      return;
    }

    const tokenSession = session?.accessToken; // Puede ser un string o undefined
    let token = "";

    if (typeof tokenSession === "string") {
      const parseToken = JSON.parse(tokenSession);
      token = parseToken.token;
    } else {
      console.log("El accessToken es undefined");
    }

    console.log(token);
    //Almacenar el token en Zustand para usarlo globalmente
    setToken(token);

    // Si hay sesión, obtener la información del perfil del usuario
    const fetchUserProfile = async () => {
      try {
        console.log("Access Token:", token);
        const data = await apiFetch({
          url: `/users/profile/`,
          method: "GET",
          token: token, // Aquí pasamos el token (string)
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(data); // Guardamos los datos del usuario en el store
        console.log("Info del usuario:", data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();

    // Obtener la ubicación (ejemplo simple usando geolocation API)
    //FIXME: cambiar por petición a la API altour o si se devuelve en el token/session
    //podemos hacer aquí el setLocation del userStore ajustando.
  }, [session, status, setUser]);

  return <>{children}</>;
};

export default UserProvider;
