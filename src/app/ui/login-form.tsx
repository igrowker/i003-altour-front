"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./button";

import { signIn, useSession } from 'next-auth/react';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {

//Google Auth
const {data: session} = useSession()
console.log(session)

//Credentials Auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

	//TODO: borrar clgs cuando funcione correctamente login
	console.log("credentialsResult", result)
	console.log(email, password)

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesion</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="ejemplo@correo.com"
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>

            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black placeholder:text-gray-500"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce tu contraseña"
                  required
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Iniciar sesión
            </Button>
            <div className="flex items-center justify-center space-x-2 mt-5">
              <p className="text-xs font-medium text-gray-900">
                ¿No tienes una cuenta?
              </p>
              <Link key="Register" href="/register">
                <p className="text-xs font-medium text-blue-600 hover:text-blue-800">
                  Regístrate
                </p>
              </Link>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500">O bien</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              className="flex items-center justify-center w-[328px] h-[48px] border border-gray-300 rounded-md px-4 py-2"
              onClick={() => signIn()}
            >
              <img
                src="/google-icon.svg"
                alt="Google Logo"
                className="w-5 h-5 mr-3"
              />
              <span className="text-gray-700 text-sm font-medium">
                Continue with Google{" "}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
