import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { MapPinIcon, GlobeAltIcon, PhoneIcon } from "@heroicons/react/24/outline";

interface PlaceDetails {
  name?: string;
  formatted_address?: string;
  website?: string;
  formatted_phone_number?: string;
  photos?: google.maps.places.PlacePhoto[];
}

interface CardMapProps {
  placeDetails: PlaceDetails | null;
}

export default function CardMap({ placeDetails }: CardMapProps) {
  const [position, setPosition] = useState(3000);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  console.log('placeDetails:', placeDetails);

  useEffect(() => {
    setPosition(window.innerHeight - 100);

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const toggleCard = () => {
    if (isExpanded) {
      setPosition(window.innerHeight - 100);
      document.body.classList.remove('overflow-hidden');
    } else {
      setPosition(200);
      document.body.classList.add('overflow-hidden');
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      ref={cardRef}
      style={{ top: `${position}px` }}
      className='fixed block h-full left-0 w-full bg-white rounded-t-3xl p-4 shadow-lg transition-all duration-300 ease-in-out'
      onClick={toggleCard}
    >
      <div className="h-1 w-12 bg-gray-400 rounded-full mx-auto mb-4" />
      <div className="mt-2 h-full">
        {placeDetails ? (
          <div className='flex flex-col gap-2 scroll-auto'>
            <h2 className="text-lg font-semibold mb-2 text-center bg-gray-200 p-2 rounded-lg">{placeDetails.name}</h2>
            <p className="text-gray-500 flex gap-2 ml-2">
              <MapPinIcon className="w-6 h-6 text-gray-500" />
              {placeDetails.formatted_address}
              </p>
            <p className="text-gray-700 flex gap-2 ml-2">
              <GlobeAltIcon className="w-5 h-5 text-gray-500" />
              {placeDetails.website}
              </p>
            <p className="text-gray-500 flex gap-2 ml-2">
              <PhoneIcon className="w-5 h-5 text-gray-500" />
              {placeDetails.formatted_phone_number}
              </p>

            <p></p>

            {placeDetails.photos && placeDetails.photos.length > 0 && (
              <Image
                src={placeDetails.photos[0].getUrl({ maxWidth: 400 })}
                alt={placeDetails.name ?? 'Imagen del lugar'}
                width={400}
                height={250}
                layout="responsive"
                className='rounded-lg mt-2'
              />
            )}
          </div>
        ) : (
          <p className='text-center'>No se ha seleccionado ningún lugar.</p>
        )}
      </div>
    </div>
  );
}
