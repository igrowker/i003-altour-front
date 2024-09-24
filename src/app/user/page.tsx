'use client';

import { useState } from 'react';


export default function UserPage() {

    const [username, setUsername] = useState('Usuario123');
    const [password, setPassword] = useState('');
    const [favoriteSites, setFavoriteSites] = useState(['Sitio 1', 'Sitio 2', 'Sitio 3']);
  
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Lógica para actualizar el perfil
      console.log('Datos actualizados:', { username, password });
    };
  
    return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-700">Mi Perfil</h1>

        {/* Información del usuario */}
        <div className="space-y-2">
          <label className="block text-gray-600">Nombre de usuario:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Actualizar perfil
        </button>

        {/* Tarjeta de sitios favoritos */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Mis sitios favoritos</h2>
          <ul className="list-disc list-inside mt-3">
            {favoriteSites.map((site, index) => (
              <li key={index} className="text-gray-600">
                {site}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    )
  }


