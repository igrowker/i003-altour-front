"use client";
import { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  HeatmapLayer,
} from "@react-google-maps/api";
import SearchOnMap from "./SearchOnMap";
import CardMap from "./CardMap";
import { useSession } from "next-auth/react";
import { useRequest } from "@/app/hooks/useRequest";
import Loading from "@/app/ui/loading";
import { useUserStore } from "@/app/store/userStore";
import Modal from "@/app/ui/dialog-panel";
import { useMapStore } from "@/app/store/mapStore";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const GOOGLE_MAPS_LIBRARIES: ("visualization" | "places" | "geometry")[] = [
  "visualization",
  "places",
  "geometry",
];

// Estilos para el modo oscuro
const darkModeStyles = [
  { elementType: "geometry", stylers: [{ color: "#212121" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#484848" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
];

interface HeatmapProps {
  searchAndCard: boolean;
  containerStyle: {
    width: string;
    height: string;
  };
}

const Heatmap: React.FC<HeatmapProps> = ({ searchAndCard, containerStyle }) => {
  const { user } = useUserStore();
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string>("");
  const [ismodalOpen, setIsmodalOpen] = useState<boolean>(false);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const {
    geolocation,
    currentDestination,
    setCurrentDestination,
    fetchGeolocation,
  } = useMapStore();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [heatmapPoints, setHeatmapPoints] = useState<
    Array<{ location: google.maps.LatLng; weight: number; venue_type: string }>
  >([]);
  const [markers, setMarkers] = useState([]);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(
    null
  );
  const [placeDetails, setPlaceDetails] = useState({
    name: "",
    address: "",
    distance: 0,
    weight: 0,
    rating: 0,
    position: {
      lat: 0,
      lng: 0,
    },
  });
  const [showMarkers, setShowMarkers] = useState(true);
  const { apiFetch } = useRequest();
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  // Extraer token de la sesión
  useEffect(() => {
    if (status === "authenticated") {
      const accessToken = session?.accessToken
        ? JSON.parse(session.accessToken)
        : "";
      setToken(accessToken?.token);
    }
  }, [session, status]);

  // Obten la geolocalización del usuario
  useEffect(() => {
    fetchGeolocation();
  }, []);

  // Cargar los datos del mapa de calor
  useEffect(() => {
    const loadHeatmapData = async () => {
      if (!geolocation || !token || !user?.maxSearchDistance) {
        setMarkers([]);
        return;
      }

      const data = await apiFetch({
        url: "/destines/",
        method: "GET",
        params: {
          lat: currentDestination ? currentDestination.lat : geolocation.lat,
          lng: currentDestination ? currentDestination.lng : geolocation.lng,
          maxCrowdLevel: user?.preferredCrowdLevel,
          maxDistance: user?.maxSearchDistance,
        },
      });
      if (data.message == "Request failed with status code 500") {
        setIsmodalOpen(true);
        return;
      } else {
        setIsmodalOpen(false);
        setMarkers(data);
      }

      const transformedData = data.map(
        (point: {
          venue_lat: number;
          venue_lng: number;
          day_raw: number[];
          venue_type: string;
        }) => ({
          location: new google.maps.LatLng(point.venue_lat, point.venue_lng),
          weight: point.day_raw[0],
          venue_type: point.venue_type,
        })
      );
      if (transformedData.length > 0) {
        setHeatmapPoints(transformedData);
      }
    };

    loadHeatmapData();
  }, [
    geolocation,
    token,
    currentDestination,
    user?.maxSearchDistance,
    user?.preferredCrowdLevel,
  ]);

  const filteredHeatmapPoints = heatmapPoints.filter(
    (point) => activeFilters.size === 0 || activeFilters.has(point.venue_type)
  );

  // Buscar lugares en el mapa
  const handleSearch = (term: string) => {
    if (mapInstance) {
      const autocompleteService = new google.maps.places.AutocompleteService();
      const request: google.maps.places.AutocompletionRequest = {
        input: term,
        location: new google.maps.LatLng(
          geolocation?.lat ?? 0,
          geolocation?.lng ?? 0
        ),
        radius: 5000,
      };

      autocompleteService.getPlacePredictions(
        request,
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setPredictions(predictions);
          } else {
            setPredictions([]);
          }
        }
      );
    }
  };

  // Seleccionar un lugar de la lista de predicciones
  const handleSelectPrediction = (placeId: string) => {
    if (mapInstance) {
      const placesService = new google.maps.places.PlacesService(mapInstance);
      placesService.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const newMarkerPosition = place.geometry?.location?.toJSON() ?? {
            lat: 0,
            lng: 0,
          };
          setCurrentDestination(newMarkerPosition);
          mapInstance.panTo(newMarkerPosition);
        }
        setSelectedPlace(place);
      });
    }
  };

  // Generar marcadores a partir de los puntos del mapa de calor
  const generateMarkersFromHeatmapPoints = (
    points: Array<{ location: google.maps.LatLng; weight: number }>
  ) => {
    return points.map((point, index) => {
      const correspondingMarker = markers[index];

      return {
        position: point.location.toJSON(),
        weight: point.weight,
        info: correspondingMarker,
      };
    });
  };

  // Función para manejar clic en los marcadores
  const handleMarkerClick = (
    marker: { position: google.maps.LatLngLiteral; weight: number; info: any },
    index: number
  ) => {
    if (mapInstance && geolocation) {
      const markerLocation = new google.maps.LatLng(
        marker?.position?.lat,
        marker?.position?.lng
      );
      const centerLocation = new google.maps.LatLng(
        currentDestination ? currentDestination.lat : geolocation.lat,
        currentDestination ? currentDestination.lng : geolocation.lng
      );

      // Calcula la distancia de tu ubicación al marcador
      const distanceInMeters =
        google.maps.geometry.spherical.computeDistanceBetween(
          centerLocation,
          markerLocation
        );

      setPlaceDetails({
        name: marker.info.venue_name,
        address: marker.info.venue_address,
        distance: Number(distanceInMeters.toFixed(0)),
        weight: marker.weight,
        rating: marker.info.rating,
        position: {
          lat: marker.position.lat,
          lng: marker.position.lng,
        },
      });

      // Establecer el índice del marcador seleccionado
      setSelectedMarkerIndex(index);
    }
  };

  const toggleMarkersVisibility = () => {
    setShowMarkers((prev) => !prev);
  };

  if (!googleMapsApiKey) {
    return <div>Error: Google Maps API key is missing</div>;
  }

  if (!user?.preferredCrowdLevel && !user?.maxSearchDistance) {
    return;
  }

  return (
    <div className="relative w-full">
      <Modal
        title="Alerta"
        content="No hay recomendaciones disponibles dentro del rango establecido. Por favor, ajusta tus preferencias."
        isOpen={ismodalOpen}
        onClose={() => setIsmodalOpen(false)}
      />
      {searchAndCard && (
        <SearchOnMap
          onSearch={handleSearch}
          onSelectPrediction={handleSelectPrediction}
          predictions={predictions}
          venueType={heatmapPoints}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      )}

      {/* Toggle visualización de Marcadores */}
      {markers.length > 0 && (
        <div
          className={`absolute ${
            searchAndCard ? "top-36" : "bottom-5"
          } right-4 flex gap-2 items-center`}
        >
          <span className="ml-2 text-xs pt-1 text-slate-50">Marcadores</span>
          <label className="relative inline-flex flex-col items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={showMarkers}
              onChange={toggleMarkersVisibility}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full shadow-inner"></div>
            <div
              className={`dot absolute w-4 h-4 top-1 bg-lime-600 rounded-full shadow transform transition duration-200 ease-in-out ${
                showMarkers ? "-translate-x-2" : "translate-x-2 bg-red-600"
              }`}
            ></div>
          </label>
        </div>
      )}

      <div>
        <LoadScript
          googleMapsApiKey={googleMapsApiKey}
          libraries={GOOGLE_MAPS_LIBRARIES}
          loadingElement={<Loading />}
        >
          {heatmapPoints.length > 0 && (
            <div
              className={`absolute ${
                searchAndCard ? "top-[80px]" : "top-[40px]"
              } right-0`}
            ></div>
          )}

          <GoogleMap
            mapContainerStyle={{
              width: containerStyle.width,
              height: containerStyle.height,
            }}
            center={
              currentDestination
                ? currentDestination
                : geolocation || { lat: 40.4167, lng: -3.7033 }
            }
            zoom={currentDestination || geolocation ? 15 : 5}
            onLoad={(map) => setMapInstance(map)}
            options={{
              disableDefaultUI: true,
              styles: darkModeStyles,
            }}
          >
            {/* Renderizar el mapa de calor solo si hay puntos */}
            {heatmapPoints.length > 0 && (
              <HeatmapLayer
                data={heatmapPoints.map((point) => ({
                  location: point.location,
                  weight: point.weight || 0,
                }))}
                options={{
                  radius: 60,
                  opacity: 0.3,
                  gradient: [
                    "rgba(0, 255, 0, 0)",
                    "rgba(0, 255, 0, 0.3)",
                    "rgba(255, 255, 0, 0.3)",
                    "rgba(255, 127, 0, 0.3)",
                    "rgba(255, 0, 0, 0.3)",
                  ],
                }}
              />
            )}

            {/* Marcador para destinos recomendados */}
            {showMarkers &&
              mapInstance &&
              generateMarkersFromHeatmapPoints(filteredHeatmapPoints).map(
                (marker, index) => (
                  <Marker
                    key={index}
                    position={marker.position}
                    icon={{
                      url:
                        selectedMarkerIndex === index
                          ? "/marker2.png"
                          : "/marker.png",
                      scaledSize: new google.maps.Size(32, 32),
                    }}
                    onClick={() => handleMarkerClick(marker, index)}
                  />
                )
              )}

            {/* Marcador para currentDestination */}
            {currentDestination &&
              mapInstance &&
              typeof currentDestination.lat === "number" &&
              typeof currentDestination.lng === "number" && (
                <Marker
                  position={currentDestination}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    scaledSize: new google.maps.Size(50, 50),
                  }}
                  title="Destino"
                />
              )}
          </GoogleMap>
        </LoadScript>
      </div>
      <CardMap placeDetails={placeDetails} />
    </div>
  );
};

export default Heatmap;
