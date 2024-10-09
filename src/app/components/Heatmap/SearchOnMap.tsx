import React, { useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
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
 /*  const handleButtonClick = () => {
    router.push("/user");
  }; */

  const uniqueVenueTypes = Array.from(
    new Set(venueType.map((venue) => venue.venue_type))
  );

  return (
    <div className="flex flex-col absolute z-10 mt-7 w-full">
      <div className="flex gap-2 justify-center px-6">
        <div className="w-full relative">
          <MagnifyingGlassIcon className="absolute z-10 w-6 top-[10px] left-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="¿Qué quieres visitar...?"
            className={`pt-2 pb-2 pl-11 bg-slate-50 outline-none relative ${
              searchTerm.length > 0 ? "rounded-t-3xl" : "rounded-3xl"
            } shadow-md h-11 w-full border-[1px]`}
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
          <AdjustmentsHorizontalIcon />
        </button>

        {/* Modal de preferencias */}
        {isPreferencesVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 relative w-3/4 max-w-lg">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                X
              </button>
              <UserPreferencesPage />
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
