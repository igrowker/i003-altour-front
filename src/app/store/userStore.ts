import { create } from "zustand";
import axios from "axios";

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
  token: string | null;
  setToken: (token: string | null) => void;
  setUser: (user: UserProfile) => void;
  updateUserPreferences: (preferences: { id: number; venueType: string }[]) => Promise<void>;
  fetchUserPreferences: () => Promise<{ id: number; venueType: string }[]>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
}

const apiFetch = async ({
  url,
  method = "GET",
  data,
  token,
  headers = {},
}: {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  token?: string;
  headers?: Record<string, string>;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const fullUrl = `${baseUrl}${url}`;

  const config = {
    method,
    url: fullUrl,
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

export const useUserStore = create<UserState>((set, get) => ({
  isLoggedIn: false,
  user: null,
  token: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user, isLoggedIn: true }),
  updateUserPreferences: async (preferences) => {
    const token = get().token;
    if (!token) throw new Error("No token available");

    try {
      await apiFetch({
        url: '/users/preferences/',
        method: 'POST',
        data: preferences,
        token,
      });
      set((state) => ({
        user: state.user ? { ...state.user, preferences } : null,
      }));
    } catch (error) {
      console.error("Error updating user preferences:", error);
      throw error;
    }
  },
  fetchUserPreferences: async () => {
    const token = get().token;
    if (!token) throw new Error("No token available");

    try {
      const preferences = await apiFetch({
        url: '/users/preferences/',
        method: 'GET',
        token,
      });
      set((state) => ({
        user: state.user ? { ...state.user, preferences } : null,
      }));
      return preferences;
    } catch (error) {
      console.error("Error fetching user preferences:", error);
      throw error;
    }
  },
  updateUserProfile: async (profileData) => {
    const token = get().token;
    if (!token) throw new Error("No token available");

    try {
      const updatedProfile = await apiFetch({
        url: '/users/profile/',
        method: 'PUT',
        data: profileData,
        token,
      });
      set((state) => ({
        user: state.user ? { ...state.user, ...updatedProfile } : null,
      }));
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },
}));