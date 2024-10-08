//TODO: En login no uso hook useRequest se gestiona desde la función de next.js singIn (configurada llamada API en route)

"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import {
  AtSymbolIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { validatePass } from "@/app/lib/formValidation"; // Importa la función de validación
//import { useRequest } from "@/app/hooks/useRequest";

// Estado inicial del formulario
interface FormState {
  email: string;
  password: string;
}

// Estado inicial de los errores
interface ErrorState {
  email?: string;
  password?: string;
}

// prop onlogin para que active el onboarding
interface LoginFormProps {
  onLogin: () => void; 
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  //recoge el estado de la sesion de next.js del usuario (si está logueado o no)
  const { data: session } = useSession();
  console.log("session", session);
  const sessionToken = session?.accessToken;
  console.log("sessionToken", typeof sessionToken);

  //Credentials Auth en un estado
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<ErrorState>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  //const { apiFetch, loading: fetchLoading, error: fetchError } = useRequest()

  // Maneja cambios en los inputs y actualiza el estado
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" }); // Limpia el error correspondiente
  };

  // Función que maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Usa la función de validación importada
    const { valid, errors } = validatePass(formState);
    if (!valid) {
      setError(errors); // Muestra los errores si los hay
      return;
    }

    setLoading(true);

    //no es necesario usar useRequest con signIn (NextJS hace la petición)
    const result = await signIn("credentials", {
      redirect: false, //evita redirección inmediata
      email: formState.email,
      password: formState.password,
      //callbackUrl: "/", //donde queremos redirigir
    });

    setLoading(false);

    console.log(result);

    if (result && !result.error) {
      onLogin(); // Llama a la prop onLogin
     
    } else {
      setError({ ...error, email: "Correo o contraseña inválidos" });
    }
  };

  // Autenticación con Google
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/home" });
  };

  return (
    <div className="flex flex-col items-center justify-between text-center min-h-screen bg-cover p-16 bg-center bg-[url('/bggradient.png')]">
      <div className="w-full max-w-md p-6 mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        {error.email && <p className="text-red-500 mb-4">{error.email}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-baseline font-bold text-gray-900"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black placeholder:text-gray-500"
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  placeholder="ejemplo@correo.com"
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              {error.email && (
                <p className="text-red-500 text-xs">{error.email}</p>
              )}
            </div>

            <div className="mt-4 relative">
              <label
                className="mb-3 mt-5 block text-baseline font-bold text-gray-900"
                htmlFor="password"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black placeholder:text-gray-500"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formState.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Introduce tu contraseña"
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {error.password && (
                <p className="text-red-500 text-xs">{error.password}</p>
              )}
            </div>
          </div>

          <div>
            <Button type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Iniciar sesión"}
            </Button>

            <div className="flex items-center justify-center space-x-2 mt-5">
              <p className="text-xs font-medium text-gray-900">
                ¿No tienes una cuenta?
              </p>
              <Link href="/register">
                <p className="text-xs font-medium text-[#FE2A5C] hover:text-blue-800">
                  Regístrate
                </p>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center mt-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">O bien</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center w-full h-[48px] border border-gray-300 rounded-md px-4 py-2 mt-3"
            onClick={handleGoogleSignIn}
          >
            <Image
              src="/google-icon.svg"
              alt="Google Logo"
              className="w-5 h-5 mr-3"
              width={22}
              height={22}
            />
            <span className="text-gray-700 text-sm font-medium">
              Continuar con Google
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
