'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faMap, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-md z-10">
    <div className="flex justify-around items-center py-2">
      <a href="/search" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <FontAwesomeIcon icon={faSearch} className="text-xl" />
        <span className="text-xs mt-1">Buscar</span>
      </a>
      <a href="/favorites" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <FontAwesomeIcon icon={faHeart} className="text-xl" />
        <span className="text-xs mt-1">Favoritos</span>
      </a>
      <a href="/heatmap" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <FontAwesomeIcon icon={faMap} className="text-xl" />
        <span className="text-xs mt-1">Mapa de Calor</span>
      </a>
      <a href="/user" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <FontAwesomeIcon icon={faUser} className="text-xl" />
        <span className="text-xs mt-1">Usuario</span>
      </a>
    </div>
  </nav>
  );
};

export default Navbar;
