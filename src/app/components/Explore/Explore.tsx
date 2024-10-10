"use client";
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useSession } from "next-auth/react";
import { useRequest } from "@/app/hooks/useRequest";
import MainLayout from "../mainLayout";
import SearchOnMap from "../Heatmap/SearchOnMap";
import Image from "next/image";
import { YellowButton } from "@/app/ui/button_yellow";
import { MapIcon } from "@heroicons/react/24/outline";
import Loading from "@/app/ui/loading";
import { useRouter } from "next/navigation";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const GOOGLE_MAPS_LIBRARIES: ("visualization" | "places" | "geometry")[] = [
  "visualization",
  "places",
  "geometry",
];

const Explore = () => {
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string>("");
  const [geolocation, setGeolocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [currentDestination, setCurrentDestination] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [recommendations, setRecommendations] = useState<
    Array<{
      venue_name: string;
      venue_address: string;
      distance: number;
      rating: number;
      venue_type: string;
      venue_lat: number;
      venue_lng: number;
      day_raw: any[];
    }>
  >([]);
  const { apiFetch } = useRequest();
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const router = useRouter();

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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error obteniendo la ubicación:", error);
      }
    );
  }, []);

  useEffect(() => {
    const recomendations = async () => {
      if (!geolocation || !token) {
        return;
      }
      const data = await apiFetch({
        url: "/destines/",
        method: "GET",
        params: {
          lat: currentDestination ? currentDestination.lat : geolocation.lat,
          lng: currentDestination ? currentDestination.lng : geolocation.lng,
          maxCrowdLevel: 30,
          maxDistance: 5000,
        },
      });
      if (data.message) {
        alert("No hay destinos disponibles dentro del rango establecido.");
        return;
      } else {
        setRecommendations(data);
      }
    };
    recomendations();
  }, [geolocation, token, currentDestination]);

  const filteredHeatmapPoints = recommendations.filter(
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

  if (!googleMapsApiKey) {
    return <div>Error: Google Maps API key is missing</div>;
  }

  const calculateDistance = (
    markerPosition: google.maps.LatLngLiteral
  ): number | null => {
    if (mapInstance && geolocation) {
      const markerLocation = new google.maps.LatLng(
        markerPosition.lat,
        markerPosition.lng
      );
      const centerLocation = new google.maps.LatLng(
        currentDestination ? currentDestination.lat : geolocation.lat,
        currentDestination ? currentDestination.lng : geolocation.lng
      );

      // Calcula y devuelve la distancia en metros
      const distanceInMeters =
        google.maps.geometry.spherical.computeDistanceBetween(
          centerLocation,
          markerLocation
        );
      return Number(distanceInMeters.toFixed(0));
    }

    return null;
  };

  const handleViewMap = () => {
    router.push("/heatmap");
  };

  return (
    <MainLayout>
      <div className="relative w-full">
        {recommendations.length > 0 && (
          <YellowButton
            className="fixed justify-center flex bottom-[90px] w-[176] cursor-pointer shadow-md left-1/2 transform -translate-x-1/2 z-20"
            onClick={handleViewMap}
          >
            Ver en el mapa
            <MapIcon className="w-5 h-5 ml-2" />
          </YellowButton>
        )}
        <SearchOnMap
          onSearch={handleSearch}
          onSelectPrediction={handleSelectPrediction}
          predictions={predictions}
          venueType={recommendations}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        {recommendations.length === 0 && (
          <div className="flex justify-center items-center h-96">
            <p className="text-lg text-slate-700">No hay recomendaciones</p>
          </div>
        )}
        {recommendations.length > 0 && (
          <div className="flex w-full flex-col pt-36 px-4 gap-4 pb-24">
            <div>
              {!currentDestination ? (
                <p className="text-sm font-semibold text-green-700">{`Recomendaciones para tu ubicación actual.`}</p>
              ) : (
                <>
                  <p className="text-sm font-semibold text-green-700">{`Recomendaciones para tu destino en ${selectedPlace?.name}`}</p>
                  <p className="text-slate-700 gap-2 text-sm">{`en ${selectedPlace?.formatted_address}`}</p>
                </>
              )}
            </div>
            {filteredHeatmapPoints.map((recommendation, index) => {
              const distance = calculateDistance({
                lat: recommendation.venue_lat,
                lng: recommendation.venue_lng,
              });

              return (
                <div
                  key={index}
                  className="relative w-full bg-slate-50 rounded border border-slate-400 shadow-[4px_10px_11px_rgba(0,0,0,0.2)]"
                >
                  <div className="absolute top-4 right-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="black"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="white"
                      className="w-7 h-7 cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </div>
                  <Image
                    src="/images/exampleImg.webp"
                    alt={recommendation.venue_name}
                    className="w-full rounded-t"
                    width={250}
                    height={160}
                  />
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1 p-3 pb-4">
                      <h2 className="text-lg font-semibold">
                        {recommendation.venue_name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {recommendation.venue_address}
                      </p>
                      <p className="text-sm text-gray-600">
                        Distancia:{" "}
                        {distance ? `${distance} metros` : "No disponible"}
                      </p>
                      <p
                        className={`flex gap-2 text-sm ${
                          recommendation.day_raw[0] <= 10
                            ? "text-green-700"
                            : recommendation.day_raw[0] <= 30
                            ? "text-green-700"
                            : recommendation.day_raw[0] <= 60
                            ? "text-orange-700"
                            : recommendation.day_raw[0] <= 80
                            ? "text-red-500"
                            : "text-red-700"
                        }`}
                      >
                        {recommendation.day_raw[0] <= 10
                          ? "Muy poco transitado"
                          : recommendation.day_raw[0] <= 30
                          ? "Poco transitado"
                          : recommendation.day_raw[0] <= 60
                          ? "Medianamente transitado"
                          : recommendation.day_raw[0] <= 80
                          ? "Muy transitado"
                          : "Altamente transitado"}
                      </p>
                    </div>
                    <div className="flex justify-between p-2">
                      <div className="flex gap-1 p-1">
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
                        <p className="text-base">
                          {recommendation.rating.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Script Google Maps */}
        <LoadScript
          googleMapsApiKey={googleMapsApiKey}
          libraries={GOOGLE_MAPS_LIBRARIES}
          loadingElement={<Loading />}
        >
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            center={geolocation || { lat: 40.4167, lng: -3.7033 }}
            zoom={geolocation ? 12 : 5}
            onLoad={(map) => setMapInstance(map)}
            options={{
              disableDefaultUI: true,
            }}
          ></GoogleMap>
        </LoadScript>
      </div>
    </MainLayout>
  );
};

export default Explore;
