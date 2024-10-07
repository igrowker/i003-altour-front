import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/app/ui/button";
import { EmptyButton } from "@/app/ui/button_empty";

interface PlaceDetails {
  name: string;
  address: string;
  distance: number;
  weight: number;
  rating: number;
  position: {
    lat: number;
    lng: number;
  };
}

interface CardMapProps {
  placeDetails: PlaceDetails | null;
}

export default function CardMap({ placeDetails }: CardMapProps) {
  const [position, setPosition] = useState(3000);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Para ajustar la posición inicial de la tarjeta
  useEffect(() => {
    setPosition(window.innerHeight - 110);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // Efecto para abrir la tarjeta cuando cambien los detalles del lugar
  useEffect(() => {
    if (placeDetails?.name) {
      setIsExpanded(true);
      setPosition(window.innerHeight - 320);
      document.body.classList.add("overflow-hidden");
    }
  }, [placeDetails]);

  const toggleCard = () => {
    if (isExpanded) {
      setPosition(window.innerHeight - 110);
      document.body.classList.remove("overflow-hidden");
    } else {
      setPosition(window.innerHeight - 320);
      document.body.classList.add("overflow-hidden");
    }
    setIsExpanded(!isExpanded);
  };

  //Navega en google maps a las coordenadas de la ubicación
  const handleNavigation = () => {
    const location = `https://www.google.com/maps/dir/?api=1&destination=${placeDetails?.position.lat},${placeDetails?.position.lng}`;
    window.open(location, "_blank");
  };

  return (
    <div
      ref={cardRef}
      style={{ top: `${position}px` }}
      className="fixed block h-full left-0 w-full bg-white rounded-t-3xl p-4 shadow-lg transition-all duration-300 ease-in-out"
      onClick={toggleCard}
    >
      <div className="h-1 w-12 bg-gray-400 rounded-full mx-auto mb-4" />
      <div className="flex mt-2 h-full w-full content-between p-1">
        {placeDetails?.name ? (
          <div className="w-full flex-col">
            <div className="flex justify-between">
              <div className="flex flex-col gap-1 pr-8">
                <h2 className="text-base font-semibold rounded-lg w-full">
                  {placeDetails.name}
                </h2>
                <p className="text-slate-700 gap-2 text-sm">
                  {placeDetails.address}
                </p>
                <p className="text-slate-700 gap-2 text-sm">
                  A {placeDetails.distance} metros
                </p>
                <p
                  className={`flex gap-2 text-sm ${
                    placeDetails.weight <= 10
                      ? "text-green-700"
                      : placeDetails.weight <= 30
                      ? "text-green-700"
                      : placeDetails.weight <= 60
                      ? "text-orange-700"
                      : placeDetails.weight <= 80
                      ? "text-red-500"
                      : "text-red-700"
                  }`}
                >
                  {placeDetails.weight <= 10
                    ? "Muy poco transitado"
                    : placeDetails.weight <= 30
                    ? "Poco transitado"
                    : placeDetails.weight <= 60
                    ? "Medianamente transitado"
                    : placeDetails.weight <= 80
                    ? "Muy transitado"
                    : "Altamente transitado"}
                </p>
              </div>
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#F7CE17"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-base">{placeDetails.rating.toFixed(1)}</p>
              </div>
            </div>
            <div className="flex mt-3 gap-2 w-full justify-center">
              <div>
                <EmptyButton className="flex gap-2 justify-center w-40">
                  Saber más
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </EmptyButton>
              </div>
              <div>
                <Button onClick={handleNavigation} className=" w-40">
                  ¡Llévame!
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">No se ha seleccionado ningún lugar.</p>
        )}
      </div>
    </div>
  );
}
