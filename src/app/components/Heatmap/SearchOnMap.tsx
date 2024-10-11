import React, { useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import UserPreferencesPage from "../preferences/preferences";

interface SearchOnMapProps {
  onSearch: (term: string) => void;
  onSelectPrediction: (placeId: string) => void;
  predictions: google.maps.places.AutocompletePrediction[];
  venueType: Array<{ venue_type: string }>;
  activeFilters: Set<string>;
  setActiveFilters: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const SearchOnMap: React.FC<SearchOnMapProps> = ({
  onSearch,
  onSelectPrediction,
  predictions,
  venueType,
  activeFilters,
  setActiveFilters,
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [allCategoriesSelected, setAllCategoriesSelected] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handlePredictionClick = (placeId: string) => {
    setSearchTerm("");
    onSelectPrediction(placeId);
  };

  const handleFilterClick = (venueType: string) => {
    const newFilters = new Set(activeFilters);

    if (venueType === "Todas las categorías") {
      if (allCategoriesSelected) {
        return;
      } else {
        newFilters.clear();
        setAllCategoriesSelected(true);
      }
    } else {
      if (newFilters.has(venueType)) {
        newFilters.delete(venueType);

        if (newFilters.size === 0) {
          setAllCategoriesSelected(true);
        }
      } else {
        newFilters.add(venueType);
        setAllCategoriesSelected(false);
      }
    }

    setActiveFilters(newFilters);
  };

  const [isPreferencesVisible, setIsPreferencesVisible] = useState(false);

  const handleButtonClick = () => {
    setIsPreferencesVisible(true);
  };

  const closeModal = () => {
    setIsPreferencesVisible(false);
  };

  const uniqueVenueTypes = Array.from(
    new Set(venueType.map((venue) => venue.venue_type))
  );

  return (
    <div className="flex flex-col absolute mt-7 w-full z-[1]">
      <div className="flex gap-2 justify-center px-6">
        <div className="w-full relative max-w-xs">
          <div className="absolute inset-y-5 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-900" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            className={`${
              searchTerm.length > 0 ? "rounded-t-3xl" : "rounded-3xl"
            }
            w-full pl-10 pr-4 h-full py-2 border-[1px] shadow-md outline-none`}
            placeholder="¿Qué quieres visitar...?"
          />
          {searchTerm.length > 0 ? (
            <ul className="absolute left-0 top-11 w-full bg-slate-50 rounded-b-3xl shadow pb-5">
              {predictions.map((prediction) => (
                <li
                  key={prediction.place_id}
                  onClick={() => handlePredictionClick(prediction.place_id)}
                  className="pl-4 p-2 cursor-pointer hover:bg-slate-200 text-sm"
                >
                  {prediction.description}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Botón de ajustes */}
        <button
          onClick={handleButtonClick}
          className="flex items-center text-center p-2 outline-none bg-slate-50 text-black rounded-full w-12 h-11 shadow-md cursor-pointer"
        >
          <AdjustmentsHorizontalIcon className="w-6 h-6" />
        </button>

        {/* Modal de preferencias */}
        {isPreferencesVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center">
            <div className="bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:w-[90%] sm:max-w-md sm:rounded-lg shadow-lg mt-0 sm:mt-10 relative flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-start items-center space-x-4 bg-slate-50 rounded-lg">
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">Preferencias</h1>
              </div>
              <div className="flex-grow overflow-y-auto">
                <UserPreferencesPage />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filtros de tipos de lugares */}
      {venueType.length > 0 && (
        <div className="flex mt-3 pl-6 overflow-x-auto scrollbar-hide h-12 py-1 gap-2 text-xs text-slate-800">
          {/* Botón "Todas las categorías" */}
          <button
            onClick={() => handleFilterClick("Todas las categorías")}
            className={`min-w-[157px] px-4 rounded-3xl bg-slate-50 outline-none whitespace-nowrap shadow-md ${
              allCategoriesSelected
                ? "border-[#FE2A5C] border-2"
                : "border-[1px]"
            }`}
          >
            Todas las categorías
          </button>

          {/* Botones para las categorías individuales */}
          {uniqueVenueTypes.map((venue, index) => (
            <button
              key={index}
              onClick={() => handleFilterClick(venue)}
              className={`min-w-[150px] px-4 py-2 rounded-3xl bg-slate-50 outline-none shadow-md ${
                activeFilters.has(venue)
                  ? "border-[#FE2A5C] border-2"
                  : "border-[1px]"
              }`}
            >
              {venue}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchOnMap;
