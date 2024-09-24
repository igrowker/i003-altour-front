'use client';

import { useState } from 'react';

const Preferences: React.FC = () => {
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(1);
  const [pets, setPets] = useState<number>(0);
  const [crowdLevel, setCrowdLevel] = useState<number>(50);

  const handleIncrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter(prev => prev + 1);
  };

  const handleDecrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter(prev => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Preferencias</h1>

      {/* Categorías */}
      <div>
        <h2 className="font-semibold mb-2">Categorías (Seleccionar 1 o varias)</h2>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gray-300 rounded-lg shadow-sm"
            >
              Categoría
            </button>
          ))}
        </div>
        <button className="mt-2 text-blue-500">Mostrar más</button>
      </div>

      {/* Multitudinómetro */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Multitudinómetro</h2>
        <input
          type="range"
          min="0"
          max="100"
          value={crowdLevel}
          onChange={(e) => setCrowdLevel(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>Baja</span>
          <span>Media</span>
          <span>Alta</span>
        </div>
      </div>

      {/* Viajeros */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Viajeros</h2>
        <div className="space-y-4">
          {/* Adultos */}
          <div className="flex items-center justify-between">
            <span>Adultos</span>
            <div className="flex items-center space-x-2">
              <button onClick={() => handleIncrement(setAdults)} className="px-2 py-1 bg-gray-300 rounded">
                +
              </button>
              <span>{adults}</span>
              <button onClick={() => handleDecrement(setAdults)} className="px-2 py-1 bg-gray-300 rounded">
                -
              </button>
            </div>
          </div>

          {/* Niños */}
          <div className="flex items-center justify-between">
            <span>Niños</span>
            <div className="flex items-center space-x-2">
              <button onClick={() => handleIncrement(setChildren)} className="px-2 py-1 bg-gray-300 rounded">
                +
              </button>
              <span>{children}</span>
              <button onClick={() => handleDecrement(setChildren)} className="px-2 py-1 bg-gray-300 rounded">
                -
              </button>
            </div>
          </div>

          {/* Mascotas */}
          <div className="flex items-center justify-between">
            <span>Mascotas</span>
            <div className="flex items-center space-x-2">
              <button onClick={() => handleIncrement(setPets)} className="px-2 py-1 bg-gray-300 rounded">
                +
              </button>
              <span>{pets}</span>
              <button onClick={() => handleDecrement(setPets)} className="px-2 py-1 bg-gray-300 rounded">
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de aplicar */}
      <button className="mt-6 w-full py-2 bg-gray-400 rounded text-white font-semibold">
        Aplicar preferencias
      </button>

      {/* Nav bar */}
      <div className="fixed bottom-0 w-full bg-gray-200 p-4">
        <nav className="flex justify-around">
          <span>Nav bar</span>
        </nav>
      </div>
    </div>
  );
};

export default Preferences;