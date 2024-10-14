import React, { useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import UserPreferencesPage from "../preferences/preferences";

interface SearchOnMapProps {
  onSearch: (term: string) => void;
  onSelectPrediction: (placeId: string) => void;
  predictions: google.maps.places.AutocompletePrediction[];
  venueType: Array<{ venue_type: string }>;
  activeFilters: Set<string>;
  setActiveFilters: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const filterEquivalences: { [key: string]: string } = {
  RESTAURANT: "Restaurantes",
  SHOPPING: "Compras",
  FAST_FOOD: "Comida Rápida",
  BAR: "Bares",
  SUPERMARKET: "Supermercados",
  GROCERY: "Tiendas de Abarrotes",
  PARK: "Parques",
  OTHER: "Otros",
  APPAREL: "Tiendas de Ropa",
  FOOD_AND_DRINK: "Comida y Bebida",
  CAFE: "Cafés",
  SHOPPING_CENTER: "Centros Comerciales",
  COFFEE: "Cafeterías",
  AIRPORT: "Aeropuertos",
  SPORTS_COMPLEX: "Complejos Deportivos",
  PHARMACY: "Farmacias",
  PERSONAL_CARE: "Cuidado Personal",
  VEHICLE: "Vehículos",
  GAS_STATION: "Gasolineras",
  MUSEUM: "Museos",
  DENTIST: "Dentistas",
  LIBRARY: "Bibliotecas",
  BANKING: "Bancos",
  TOURIST_DESTINATION: "Destinos Turísticos",
  CASH_MACHINE: "Cajeros Automáticos",
  FOOD_DELIVERY: "Entrega de Comida",
  EVENT_VENUE: "Lugares de Eventos",
  SPA: "Spas",
  MARKET: "Supermercados",
  CLUBS: "Clubs",
  PUBLIC_TRANSIT: "Transporte Público",
  BREWERY: "Cervecerías",
  SPORTING_GOODS: "Artículos Deportivos",
  HISTORICAL: "Históricos",
  PERFORMING_ARTS: "Artes Escénicas",
  DOCTOR: "Médicos",
  AMUSEMENT_PARK: "Parques de Atracciones",
  GIFTS: "Tiendas de regalos",
  TEA: "Teterías",
  CHURCH: "Iglesias",
  SKILL_INSTRUCTION: "Instrucción de Habilidades",
  TRAIN_STATION: "Estaciones de Tren",
  ARTS: "Artes",
  GOLF: "Golf",
  ZOO: "Zoológicos",
  BOTANICAL_GARDEN: "Jardines Botánicos",
  NATIONAL_PARK: "Parques Nacionales",
  SUBWAY_STATION: "Estaciones de Metro",
  CASINO: "Casinos",
  MOVIE_THEATER: "Cines",
  POST_OFFICE: "Oficinas de Correos",
  HIKING: "Senderismo",
  GOLF_COURSE: "Campos de Golf",
  NATURE_RESERVE: "Reservas Naturales",
  BRIDGE: "Puentes",
  BUS_STATION: "Estaciones de Autobuses",
  GOVERNMENT: "Gobierno",
  REST_AREA: "Áreas de Descanso",
  WINERY: "Bodegas",
  SCENIC_POINT: "Puntos Escénicos",
  SOUVENIR_SHOP: "Tiendas de Souvenirs",
  CITY_HALL: "Ayuntamientos",
  BOATING: "Navegación",
  CONCERT_HALL: "Salas de Conciertos",
  SWIMMING: "Piscinas",
  MONUMENT: "Monumentos",
  SOCCER: "Fútbol",
  CAR_RENTAL: "Alquiler de Autos",
  MOSQUE: "Mezquitas",
  INDUSTRIAL: "Industrial",
  VISITOR_CENTER: "Centros de Visitantes",
  ANTIQUES: "Antigüedades",
  AQUARIUM: "Acuarios",
  PALACE: "Palacios",
  HINDU_TEMPLE: "Templos Hindúes",
  STADIUM: "Estadios",
  WINTER_SPORTS: "Deportes de Invierno",
  BUDDHIST_TEMPLE: "Templos Budistas",
  EMBASSY: "Embajadas",
  TEMPLE: "Templos",
  TENNIS: "Tenis",
  BASEBALL: "Béisbol",
  FERRY_TERMINAL: "Terminales de Ferry",
  FISHING: "Pesca",
  POLICE: "Policía",
  SCHOOL: "Escuelas",
  BAKERY: "Panaderías",
  AGRICULTURE: "Agricultura",
  CRICKET: "Cricket",
  FAIRGROUNDS: "Ferias",
  GONDOLA_LIFT_STATION: "Estaciones de Teleférico",
  HOSPITAL: "Hospitales",
  LIGHTHOUSE: "Faros",
  MILITARY: "Cuarteles militares",
  MORMON_TEMPLE: "Templos Mormones",
  UNIVERSITY: "Universidades",
  BURGER_RESTAURANT: "Hamburgueserías",
  BEER: "Cervecerías",
  MEDITERANEAN_RESTAURANT: "Restaurantes Mediterráneos",
  CHINESE_RESTAURANT: "Restaurantes Chinos",
  SEAFOOD_RESTAURANT: "Marisquerías",
  PIZZA_RESTAURANT: "Pizzerías",
  AMERICAN_RESTAURANT: "Restaurantes Americanos",
  MEXICAN_RESTAURANT: "Restaurantes Mexicanos",
  JAPANESE_RESTAURANT: "Restaurantes Japoneses",
  VEGETERIAN_RESTAURANT: "Restaurantes Vegetarianos",
  ITALIAN_RESTAURANT: "Restaurantes Italianos",
  BREAKFAST_RESTAURANT: "Restaurantes de Desayuno",
  SANDWICH_RESTAURANT: "Restaurantes de Sándwiches",
};

const SearchOnMap: React.FC<SearchOnMapProps> = ({
  onSearch,
  onSelectPrediction,
  predictions,
  venueType,
  activeFilters,
  setActiveFilters,
}) => {
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
          {uniqueVenueTypes.map((venue, index) => {
            const displayName =
              filterEquivalences[venue as keyof typeof filterEquivalences] ||
              venue; // Usa la equivalencia o deja el original
            return (
              <button
                key={index}
                onClick={() => handleFilterClick(venue)}
                className={`min-w-[150px] px-4 rounded-3xl bg-slate-50 outline-none shadow-md ${
                  activeFilters.has(venue)
                    ? "border-[#FE2A5C] border-2"
                    : "border-[1px]"
                }`}
              >
                {displayName}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchOnMap;
