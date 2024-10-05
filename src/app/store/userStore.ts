import { create } from "zustand";
// Definir el estado global

//FIXME: he comentado las partes que no sé si vamos a usar

interface UserProfile {
  id: number;
  username: string;
  email: string;
  acceptedTOS: boolean;
  maxSearchDistance: number;
  preferredCrowdLevel: number;
  preferences: { id: number; venueType: string }[];
  favorites: {
    id: number;
    externalAPI: string;
    name: string;
    externalID: string;
  }[];
}

interface UserState {
  isLoggedIn: boolean;
  user: UserProfile | null;
  token: string | null; // Ahora es un string o null, no un objeto.
  //location: string | null; // Podemos usar el estado para manejar la ubicación del usuario
  setToken: (token: string | null) => void;
  setUser: (user: UserProfile) => void;
  //setLocation: (location: string) => void;
  //logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null, // Token inicial es null
  //location: null,
  setToken: (token) => set({ token }), // Setter para actualizar el token
  setUser: (user) => set({ user, isLoggedIn: true }),
  //setLocation: (location) => set({ location }),
  //TODO: traer aquí la lógica del logout:
  //   logout: () => set({ isLoggedIn: false, user: null, location: null }),
}));
