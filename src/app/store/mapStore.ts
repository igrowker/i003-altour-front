import { create } from "zustand";

interface MapStoreState {
  currentDestination: { lat: number; lng: number } | null;
  setCurrentDestination: (
    destination: { lat: number; lng: number } | null
  ) => void;
  geolocation: { lat: number; lng: number } | null;
  setGeolocation: (geo: { lat: number; lng: number } | null) => void;
  fetchGeolocation: () => void;
}

export const useMapStore = create<MapStoreState>((set) => ({
  currentDestination: null,
  setCurrentDestination: (destination) =>
    set({ currentDestination: destination }),
  geolocation: null,
  setGeolocation: (geo) => set({ geolocation: geo }),
  fetchGeolocation: () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userGeo = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        set({ geolocation: userGeo });
      },
      (error) => {
        console.error("Error obteniendo la ubicación:", error);
      }
    );
  },
}));
