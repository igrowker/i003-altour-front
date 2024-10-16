"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/userStore";
import "../../globals.css";
import {
  Shrub,
  Landmark,
  Castle,
  School,
  Bike,
  TramFront,
  CarFront,
  PersonStanding,
} from "lucide-react";
import { toast } from "react-toastify";

type TransportMode =
  | "A pie"
  | "Patinete"
  | "Vehículo"
  | "Bici"
  | "Transporte público";
type Preference =
  | "Parques y jardines"
  | "Museos"
  | "Monumentos"
  | "Edificios históricos";

interface UserPreferences {
  toleranceLevel: "Baja" | "Media" | "Alta";
  searchRange: number;
  travelWithPets: boolean;
  avoidCrowds: boolean;
  visitPointsOfInterest: boolean;
  preferences: Preference[];
  transportMode: TransportMode;
}

// Definir las preferencias iniciales
const initialPreferences: UserPreferences = {
  toleranceLevel: "Media",
  searchRange: 5, 
  travelWithPets: false,
  avoidCrowds: false,
  visitPointsOfInterest: true,
  preferences: [],
  transportMode: "A pie",
};

export default function UserPreferencesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { user, fetchUserPreferences, updateUserProfile } = useUserStore();
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);

  const [toleranceMessage, setToleranceMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false); // Estado para deshabilitar el botón mientras se guarda
  const [isModalOpen, setIsModalOpen] = useState(false);

  const preferenceIcons = {
    "Parques y jardines": Shrub,
    Museos: Landmark,
    Monumentos: School,
    "Edificios históricos": Castle,
  };

  const travelIcons = {
    "A pie": PersonStanding,
    Patinete: Bike,
    Vehículo: CarFront,
    Bici: Bike,
    "Transporte público": TramFront,
  };

  useEffect(() => {
    if (status === "authenticated" && user) {
      setPreferences((prev) => ({
        ...prev,
        toleranceLevel:
          user.preferredCrowdLevel <= 33
            ? "Baja"
            : user.preferredCrowdLevel <= 66
            ? "Media"
            : "Alta",
        searchRange: user.maxSearchDistance / 1000, // Convertir de metros a kilómetros
        preferences: user.preferences.map(
          (p: { venueType: string }) => p.venueType as Preference
        ),
      }));
    }
  }, [user, status]);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        await fetchUserPreferences();
      } catch (error) {
        console.error("Error loading user preferences:", error);
      }
    };
    if (status === "authenticated") {
      loadPreferences();
    }
  }, [status, fetchUserPreferences]);

  const handleToleranceChange = (level: "Baja" | "Media" | "Alta") => {
    setPreferences((prev) => ({ ...prev, toleranceLevel: level }));

    // Actualiza el mensaje basado en el nivel de tolerancia seleccionado
    const message =
      level === "Baja"
        ? "Prefieres disfrutar de una experiencia tranquila donde no haya grandes grupos de personas a tu alrededor."
        : level === "Media"
        ? "Disfrutas en sitios con una cantidad moderada de personas, donde hay algo de movimiento pero sin llegar a ser abrumador."
        : "Te sientes a gusto en lugares concurridos y llenos de actividad. No te importa compartir la experiencia entre grandes grupos de personas.";

    setToleranceMessage(message);
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences((prev) => ({
      ...prev,
      searchRange: parseInt(event.target.value),
    }));
  };

  const handleToggle = (key: keyof UserPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key as keyof UserPreferences],
    }));
  };

  const handlePreferenceToggle = (pref: Preference) => {
    setPreferences((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref],
    }));
  };

  const handleTransportModeChange = (mode: TransportMode) => {
    setPreferences((prev) => ({ ...prev, transportMode: mode }));
  };

  const handleSave = () => {
    // Abrir la modal de confirmación
    setIsModalOpen(true);
  };

  const confirmSave = async () => {
    setIsModalOpen(false);
    setIsSaving(true);
    try {
      // Validaciones
      if (preferences.searchRange < 1 || preferences.searchRange > 30) {
        setToleranceMessage("El rango de búsqueda debe estar entre 1 y 30 Km.");
        return;
      }

      // Calcular los valores a enviar
      const crowdLevel =
        preferences.toleranceLevel === "Baja"
          ? 33
          : preferences.toleranceLevel === "Media"
          ? 66
          : 100;
      const searchDistance = preferences.searchRange * 1000; // Convertir de km a metros

      // Crear el payload
      const profileData = {
        maxSearchDistance: searchDistance,
        preferredCrowdLevel: crowdLevel,
      };

      console.log("Enviando profileData:", profileData); // Para depuración

      // Enviar los datos al backend
      await updateUserProfile(profileData);

      // Mostrar el toast de éxito
      toast.success("Preferencias actualizadas con éxito", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Opcional: Resetear otros estados o realizar acciones adicionales
    } catch (error: any) {
      console.error("Error saving preferences:", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
        setToleranceMessage(`Error: ${JSON.stringify(error.response.data)}`);
      } else {
        setToleranceMessage("Ocurrió un error al guardar las preferencias.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const cancelSave = () => {
    setIsModalOpen(false);
  };


  const handleReset = () => {
    setPreferences(initialPreferences);
    setToleranceMessage(""); // Limpiar mensajes si es necesario
    toast.info("Preferencias restablecidas a valores predeterminados", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md relative z-[4]">
      {/* Modal de Confirmación */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[5]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Confirmación</h2>
            <p className="mb-6">
              ¿Estás seguro que quieres guardar tus cambios?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelSave}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmSave}
                className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ajustes generales</h2>
        <div className="mb-4">
          <h3 className="font-bold text-lg">Tolerancia a las multitudes</h3>
          <p className="text-sm p-2">
            Establece tu nivel de tolerancia a transitar por lugares masificados
          </p>
          <div className="flex justify-between">
            {["Baja", "Media", "Alta"].map((level) => (
              <button
                key={level}
                onClick={() =>
                  handleToleranceChange(level as "Baja" | "Media" | "Alta")
                }
                className={`justify-content md:px-10 px-8 py-2 rounded shadow-md ${
                  preferences.toleranceLevel === level
                    ? "outline outline-2 outline-rose-500 text-rose-500"
                    : " outline outline-2 outline-gray-200 bg-slate-50"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Mostrar el mensaje de tolerancia */}
          {toleranceMessage && (
            <p className="mt-2 text-sm text-gray-500">{toleranceMessage}</p>
          )}
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-lg">Rango de búsqueda</h3>
          <p className="text-sm p-2">
            Selecciona el área de distancia en el que quieres encontrar
            recomendaciones.
          </p>
          <input
            type="range"
            min="1"
            max="30"
            value={preferences.searchRange}
            onChange={handleRangeChange}
            style={{
              background: `linear-gradient(to right, #FE2A5C ${
                ((preferences.searchRange - 1) / 29) * 100
              }%, #e5e7eb ${((preferences.searchRange - 1) / 29) * 100}%)`,
            }}
            className="w-full range-input"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>1 Km</span>
            <span className="font-bold">{preferences.searchRange} Km</span>
            <span>30 Km</span>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Otras consideraciones</h2>
        <div className="flex items-center justify-between mb-2">
          <span>Viajo con mascotas</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={preferences.travelWithPets}
              onChange={() => handleToggle("travelWithPets")}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Opciones de ruta</h2>
        <div className="flex items-center justify-between mb-2">
          <span>Evitar aglomeraciones</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={preferences.avoidCrowds}
              onChange={() => handleToggle("avoidCrowds")}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span>Pasar por lugares de interés</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={preferences.visitPointsOfInterest}
              onChange={() => handleToggle("visitPointsOfInterest")}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">
          ¿Qué te gustaría ver en el camino?
        </h2>
        <p className="text-sm p-2">Puedes seleccionar una o varias opciones</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(preferenceIcons).map(([pref, Icon]) => (
            <button
              key={pref}
              onClick={() => handlePreferenceToggle(pref as Preference)}
              className={`px-4 py-2 text-sm rounded-full shadow-md flex items-center justify-center ${
                preferences.preferences.includes(pref as Preference)
                  ? "outline outline-2 outline-rose-500 text-rose-500"
                  : "outline outline-2 outline-gray-200 bg-white"
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              <span>{pref}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          ¿Cómo te vas a desplazar?
        </h2>
        <div className="grid grid-cols-3 gap-2 whitespace-nowrap">
          {Object.entries(travelIcons).map(([mode, Icon]) => (
            <button
              key={mode}
              onClick={() => handleTransportModeChange(mode as TransportMode)}
              className={` px-5 mx-auto py-2 text-sm rounded-full shadow-md flex items-center justify-center ${
                preferences.transportMode === mode
                  ? "outline outline-2 outline-rose-500 text-rose-500"
                  : "outline outline-2 outline-gray-200 bg-white"
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              <span>{mode}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="mt-12 flex justify-between mx-auto w-full text-xl">
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-white text-rose-500 outline outline-2 outline-rose-500 rounded"
        >
          Restablecer
        </button>
        <button
          onClick={handleSave}
          className={`px-6 py-2 rounded ${
            isSaving
              ? "bg-rose-300 cursor-not-allowed"
              : "bg-rose-500 text-white"
          }`}
          disabled={isSaving}
        >
          {isSaving ? "Guardando..." : "Aplicar cambios"}
        </button>
      </div>
    </div>
  );
}
