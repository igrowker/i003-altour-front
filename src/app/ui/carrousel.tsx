"use client";
import React, { useState } from 'react';
import Image from 'next/image'; 

interface Slide {
    id: number;
    nombre: string;
    descripcion: string;
}

interface CarruselProps {
    slides: Slide[];
}

const Carrusel: React.FC<CarruselProps> = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slidesToShow = 4;
    const slidesToShowMedium = 2;  
    const slidesToShowSmall = 1; 

    const totalSlides = slides.length;

    const getSlidesToShow = () => {
        if (typeof window !== "undefined") {
            if (window.innerWidth <= 640) {
                return slidesToShowSmall;
            } else if (window.innerWidth <= 1024) {
                return slidesToShowMedium;
            } else {
                return slidesToShow; 
            }
        }
        return slidesToShow; 
    };

    const handlePrevClick = () => {
        const visibleSlides = getSlidesToShow();
        setCurrentIndex(currentIndex === 0 ? totalSlides - visibleSlides : currentIndex - visibleSlides);
    };

    const handleNextClick = () => {
        const visibleSlides = getSlidesToShow();
        setCurrentIndex((currentIndex + visibleSlides) % totalSlides);
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden"> 
            {/* Carrusel */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${(currentIndex / getSlidesToShow()) * 100}%)` }} 
            >
                {slides.map((slide) => (
                    <div 
                        key={slide.id} 
                        className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-2"
                    > {/* Cambiar el ancho según el tamaño de la pantalla */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#" className="flex justify-center">
                                <Image src="/isotipo_altour.png" alt="altour logo" width={150} height={200} />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">
                                        {slide.nombre}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-xs text-gray-700 dark:text-gray-400">
                                    {slide.descripcion}
                                </p>
                                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Ver más
                                    <svg
                                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botones de navegación */}
            <button 
                onClick={handlePrevClick} 
                className="absolute top-1/2 left-0 transform -translate-y-1/2  text-black px-4 py-2 rounded-full"
            >
                ‹
            </button>
            <button 
                onClick={handleNextClick} 
                className="absolute top-1/2 right-0 transform -translate-y-1/2  text-black px-4 py-2 rounded-full"
            >
                ›
            </button>
        </div>
    );
};

export default Carrusel;
