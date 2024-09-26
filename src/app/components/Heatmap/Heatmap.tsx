"use client";
import { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  HeatmapLayer,
} from "@react-google-maps/api";
import SearchOnMap from "./SearchOnMap";
import { useFetch } from "../../hooks/useFetch";
import CardMap from "./CardMap";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const Heatmap: React.FC = () => {
  const [geolocation, setGeolocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null); // Ubicación actual
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null); // Instancia del mapa
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]); // Predicciones de búsqueda
  const [currentMarker, setCurrentMarker] = useState<google.maps.Marker | null>(
    null
  ); // Marcador actual
  const [currentDestination, setCurrentDestination] = useState<{
    lat: number;
    lng: number;
  } | null>(null); // Destino actual
  const [placeDetails, setPlaceDetails] =
    useState<google.maps.places.PlaceResult | null>(null); // Detalles del lugar seleccionado
  const [heatmapPoints, setHeatmapPoints] = useState<
    Array<{ location: google.maps.LatLng; weight: number }>
  >([]); // Puntos para el mapa de calor

  const { apiFetch } = useFetch();

  // Geolocalización
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

  // Carga de datos para el mapa de calor
  useEffect(() => {
    const loadHeatmapData = async () => {
      if (geolocation || currentDestination) {
        const geoData = geolocation
          ? await apiFetch("heatmapData", {
              lat: geolocation.lat,
              lng: geolocation.lng,
            })
          : [];

        const geoTransformedData = geoData.map(
          (point: {
            location: { lat: number; lng: number };
            weight: number;
          }) => ({
            location: new google.maps.LatLng(
              point.location.lat,
              point.location.lng
            ),
            weight: point.weight,
          })
        );

        let destTransformedData = [];
        if (currentDestination) {
          const destData = await apiFetch("heatmapData", {
            lat: currentDestination.lat,
            lng: currentDestination.lng,
          });
          destTransformedData = destData.map(
            (point: {
              location: { lat: number; lng: number };
              weight: number;
            }) => ({
              location: new google.maps.LatLng(
                point.location.lat,
                point.location.lng
              ),
              weight: point.weight,
            })
          );
        }

        setHeatmapPoints([...geoTransformedData, ...destTransformedData]);
      }
    };

    loadHeatmapData();
  }, [geolocation, currentDestination]);

  // Autocompletado para la búsqueda de lugares
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
            console.error("Error en el autocompletado:", status);
            setPredictions([]);
          }
        }
      );
    }
  };

  // Detalles del lugar seleccionado
  const handleSelectPrediction = (placeId: string) => {
    if (mapInstance) {
      const placesService = new google.maps.places.PlacesService(mapInstance);
      placesService.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          if (currentMarker) {
            currentMarker.setMap(null);
          }

          const newMarker = new google.maps.Marker({
            position: place.geometry?.location ?? new google.maps.LatLng(0, 0),
            map: mapInstance,
            title: place.name ?? "",
          });

          setCurrentMarker(newMarker);
          mapInstance.setCenter(
            place.geometry?.location ?? new google.maps.LatLng(0, 0)
          );
          setPlaceDetails(place);
          setPredictions([]);
          setCurrentDestination(
            place.geometry?.location?.toJSON() ?? { lat: 0, lng: 0 }
          );
        } else {
          console.error("Error obteniendo detalles del lugar:", status);
        }
      });
    }
  };

  if (!googleMapsApiKey) {
    return <div>Error: Google Maps API key is missing</div>;
  }

  return (
    <div className="relative h-screen">
      <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={["visualization", "places"]}
      >
        <SearchOnMap
          onSearch={handleSearch}
          onSelectPrediction={handleSelectPrediction}
          predictions={predictions}
        />
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "calc(100svh - 145px)",
          }}
          center={
            geolocation || {
              lat: 40.4167,
              lng: -3.7033,
            }
          }
          zoom={geolocation ? 12 : 5}
          onLoad={(map) => setMapInstance(map)}
          options={{ disableDefaultUI: true }}
        >
          {heatmapPoints.length > 0 && (
            <HeatmapLayer
              data={heatmapPoints.map((point) => ({
                location: point.location,
                weight: point.weight,
              }))}
              options={{
                radius: 25,
                gradient: [
                  "rgba(0, 255, 0, 0)",
                  "rgba(0, 255, 0, 0.5)",
                  "rgba(255, 255, 0, 0.5)",
                  "rgba(255, 165, 0, 0.5)",
                  "rgba(255, 0, 0, 0.5)",
                ],
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      <CardMap placeDetails={placeDetails} />
    </div>
  );
};

export default Heatmap;
