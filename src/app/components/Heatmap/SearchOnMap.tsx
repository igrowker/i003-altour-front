import React, { ChangeEvent, useState } from 'react';
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchOnMapProps {
  onSearch: (term: string) => void;
  onSelectPrediction: (placeId: string) => void;
  predictions: google.maps.places.AutocompletePrediction[];
}

const SearchOnMap: React.FC<SearchOnMapProps> = ({ onSearch, onSelectPrediction, predictions }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const applyFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="flex flex-col z-10 p-3 relative">
      <div className="flex gap-3">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Busca tu destino..."
            className="bg-gray-300 w-full h-12 rounded-3xl border border-gray-200 py-[9px] pl-11 outline-2 text-black placeholder:text-gray-500"
          />
          {predictions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-20">
              {predictions.map((prediction) => (
                <li
                  key={prediction.place_id}
                  onClick={() => onSelectPrediction(prediction.place_id)}
                  className="p-2 cursor-pointer hover:bg-gray-100 text-black"
                >
                  {prediction.description}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={toggleFilters}
          className="w-16 h-12 bg-gray-300 rounded-full flex items-center justify-center"
        >
          <AdjustmentsHorizontalIcon className="w-6 h-6" />
        </button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out transform ${
          isFilterVisible ? 'opacity-100 max-h-40 translate-y-0' : 'opacity-0 max-h-0 translate-y-[-20px]'
        } overflow-hidden`}
      >
        <div className="relative mt-3">
          <div className="flex gap-2 items-center overflow-x-scroll scrollbar-hide whitespace-nowrap relative touch-pan-x pl-2 pr-2">
            <button onClick={() => applyFilter('Museos')} className="bg-gray-300 px-3 py-1 rounded-lg text-sm">
              Museos
            </button>
            <button onClick={() => applyFilter('Monumentos')} className="bg-gray-300 px-3 py-1 rounded-lg text-sm">
              Monumentos
            </button>
            <button onClick={() => applyFilter('Tiendas')} className="bg-gray-300 px-3 py-1 rounded-lg text-sm">
              Tiendas
            </button>
            <button onClick={() => applyFilter('Restaurantes')} className="bg-gray-300 px-3 py-1 rounded-lg text-sm">
              Restaurantes
            </button>
            <button onClick={() => applyFilter('Cafeterias')} className="bg-gray-300 px-3 py-1 rounded-lg text-sm">
              Cafeterías
            </button>
          </div>

          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-white pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-white pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchOnMap;
