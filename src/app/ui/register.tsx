"use client";

//TODO: implementar validaciones en los forms de registro y login
//TODO: implementar la llamada a la API para enviar los datos
//TODO: borrar comentarios.

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { Button } from "./button";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  // Manejar cambios en los campos del formulario
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar envío del formulario
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formData", formData);
    // Aquí se puede llamar a una API o servicio de autenticación
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
          onSubmit={onSubmit}
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
              onChange={onChange}
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
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Escribe una contraseña*"
              required
            />
          </div>
          {/* //TODO: validaciones - repite contraseña */}
          <div>FALTA REPITE TU CONTRESEÑA</div>
          <div>CHECKBOX Acepto los Terminos ....</div>

          <div className="flex items-center justify-between">
            <Button type="submit">Register</Button>
          </div>

          <div>
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500">O bien</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              className="flex items-center justify-center w-[328px] h-[48px] border border-gray-300 rounded-md px-4 py-2"
              //TODO: implementar el registro con Google
              // onClick={() => signIn()}
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
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
