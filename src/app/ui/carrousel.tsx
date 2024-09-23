"use client"
import React, { useState } from 'react';
import Image from 'next/image'; // Si usas Next.js

interface Recomendacion {
    id: number;
    nombre: string;
    descripcion: string;
  }

  interface CarruselRecomendacionesProps {
    recomendaciones: Recomendacion[];
  }

const CarruselRecomendaciones:React.FC<CarruselRecomendacionesProps> =     ({ recomendaciones }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = recomendaciones.length;

    const handlePrevClick = () => {
        setCurrentIndex(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
    };

    const handleNextClick = () => {
        setCurrentIndex(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
    };

    return (
        <div className="relative w-full max-w-lg mx-auto overflow-hidden"> {/* Aseguramos overflow-hidden */}
            {/* Carrusel */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Movemos las diapositivas
            >
                {recomendaciones.map((recomendacion) => (
                    <div key={recomendacion.id} className="w-full flex-shrink-0"> {/* Cada slide ocupa el 100% del ancho */}
                        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
                            <a href="#">
                                <Image src="/isotipo_altour.png" alt="altour logo" width={150} height={200} />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">{recomendacion.nombre}</h5>
                                </a>
                                <p className="mb-3 font-normal text-xs text-gray-700 dark:text-gray-400">{recomendacion.descripcion}</p>
                                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Ver más
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botones de navegación */}
            <button onClick={handlePrevClick} className="absolute top-1/2 left-0 transform -translate-y-1/2 text-black px-2 py-2">
                ‹
            </button>
            <button onClick={handleNextClick} className="absolute top-1/2 right-0 transform -translate-y-1/2 text-black px-2 py-2">
                ›
            </button>
        </div>
    );
};

export default CarruselRecomendaciones;