import { useState } from "react";

export const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(true);

    const apiFetch = async (destination: string,  dataFetch: { lat: number, lng: number }) => {
      let url = '';

      // Destino para obtener los puntos del mapa de calor
      if (destination === "heatmapData") {
        url = `http://localhost:8080/api/heat-map?lat=${dataFetch.lat}&lng=${dataFetch.lng}&rad=40`;
      }
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        if (response.ok) {
          setLoading(false);
          return result;
        }
        if (!response.ok) {
          setLoading(false);
          console.error(result.error);
          return;
        }

      } catch (error: any) {
        setLoading(false);
        console.error(error.message);
      }
  };

  return { apiFetch, loading };
};
