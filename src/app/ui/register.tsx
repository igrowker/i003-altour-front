"use client";

//TODO: implementar validaciones en los forms de registro y login
//TODO: implementar la llamada a la API para enviar los datos
//TODO: borrar comentarios.

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { Button } from "./button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Modal from "./dialog-panel";
import { validatePass } from "../lib/formValidation";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
}
interface ErrorState {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accept: false,
  });

  const [error, setError] = useState<ErrorState>({});
  const [showTermsModal, setShowTermsModal] = useState(false); // Para términos y condiciones
  const [showWarningModal, setShowWarningModal] = useState(false); // Para advertencia aceptación
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Nuevo estado para confirm password

  const { name, email, password, confirmPassword, accept } = formData;

  // Maneja cambios en los campos del formulario
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
    setError({ ...error, [e.target.name]: "" });
  };

  // Maneja los errores y el envío del formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { valid, errors } = validatePass({ password });

    if (!valid) {
      setError(errors);
      return;
    }

    if (password !== confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Las contraseñas no coinciden.",
      }));
      return;
    }

    if (!accept) {
      setShowWarningModal(true);
      return;
    }

    console.log("formData", formData);
    // Aquí se puede llamar a una API o servicio de autenticación
  };

  const handleGoogleSignUp = () => {
    // Mostrar advertencia si no ha aceptado los términos antes de intentar registrarse con Google
    if (!accept) {
      setShowWarningModal(true);
      return;
    }

    // Aquí iría la lógica para el registro con Google
    console.log("Registro con Google");
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Crear una cuenta
        </h2>
        <div className="flex items-center justify-center space-x-2 mt-5">
          <p className="text-xs font-medium text-gray-900">
            ¿Ya tienes una cuenta?
          </p>
          <Link key="Login" href="/login">
            <p className="text-xs font-medium text-[#FE2A5C] hover:text-blue-800">
              Inicia Sesión
            </p>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ejemplo: Daniel"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10" // Espacio para el icono
              placeholder="Escribe una contraseña*"
              required
            />
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
            {error.password && (
              <p className="text-red-500 text-xs italic">{error.password}</p>
            )}
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirmar Contraseña
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10" // Espacio para el icono
              placeholder="Confirma tu contraseña*"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {error.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {error.confirmPassword}
              </p>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="accept"
              id="accept"
              checked={accept}
              onChange={handleInputChange}
              className="mr-2 leading-tight"
            />
            <label htmlFor="accept" className="text-sm text-gray-700">
              Acepto los
            </label>
            <span
              onClick={() => setShowTermsModal(true)}
              className="text-[#FE2A5C] hover:text-gray-800 underline cursor-pointer ml-1"
            >
              términos y condiciones
            </span>
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit">Registrar</Button>
          </div>
        </form>

        <div>
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">O bien</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Botón de registro con Google */}
          <button
            className="flex items-center justify-center w-[328px] h-[48px] border border-gray-300 rounded-md px-4 py-2 mt-4"
            onClick={handleGoogleSignUp}
          >
            <img
              src="/google-icon.svg"
              alt="Google Logo"
              className="w-5 h-5 mr-3"
            />
            <span className="text-gray-700 text-sm font-medium">
              Registrarme con Google{" "}
            </span>
          </button>
        </div>

        {/* Modal para términos y condiciones */}
        <Modal
          title="Términos y condiciones"
          content="Aquí van los términos y condiciones."
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
        />

        {/* Modal de advertencia */}
        <Modal
          title="Advertencia"
          content="Debes aceptar los términos y condiciones para continuar con el registro."
          isOpen={showWarningModal}
          onClose={() => setShowWarningModal(false)}
        />
      </div>
    </div>
  );
}


