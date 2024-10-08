'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '../../store/userStore'
import '../../globals.css'

type TransportMode = 'A pie' | 'Patinete' | 'Vehículo' | 'Bici' | 'Transporte público'
type Preference = 'Parques y jardines' | 'Museos' | 'Monumentos' | 'Edificios históricos'

interface UserPreferences {
  toleranceLevel: 'Baja' | 'Media' | 'Alta'
  searchRange: number
  travelWithPets: boolean
  avoidCrowds: boolean
  visitPointsOfInterest: boolean
  preferences: Preference[]
  transportMode: TransportMode
}

export default function UserPreferencesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { user, fetchUserPreferences, updateUserPreferences, updateUserProfile } = useUserStore()
  const [preferences, setPreferences] = useState<UserPreferences>({
    toleranceLevel: 'Media',
    searchRange: 10,
    travelWithPets: false,
    avoidCrowds: false,
    visitPointsOfInterest: true,
    preferences: [],
    transportMode: 'A pie'
  })

  useEffect(() => {
    if (status === 'authenticated' && user) {
      setPreferences(prev => ({
        ...prev,
        toleranceLevel: user.preferredCrowdLevel <= 33 ? 'Baja' : user.preferredCrowdLevel <= 66 ? 'Media' : 'Alta',
        searchRange: user.maxSearchDistance / 1000, // Convertir de metros a kilómetros
        preferences: user.preferences.map((p: { venueType: string }) => p.venueType as Preference),
      }))
    }
  }, [user, status])

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        await fetchUserPreferences()
      } catch (error) {
        console.error("Error loading user preferences:", error)
      }
    }
    if (status === 'authenticated') {
      loadPreferences()
    }
  }, [status, fetchUserPreferences])

  const handleToleranceChange = (level: 'Baja' | 'Media' | 'Alta') => {
    setPreferences(prev => ({ ...prev, toleranceLevel: level }))
  }

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences(prev => ({ ...prev, searchRange: parseInt(event.target.value) }))
  }

  const handleToggle = (key: keyof UserPreferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key as keyof UserPreferences] }))
  }

  const handlePreferenceToggle = (pref: Preference) => {
    setPreferences(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref]
    }))
  }

  const handleTransportModeChange = (mode: TransportMode) => {
    setPreferences(prev => ({ ...prev, transportMode: mode }))
  }

  const handleSave = async () => {
    try {
      const updatedPreferences = preferences.preferences.map(pref => ({
        id: user?.preferences.find((p: { venueType: string }) => p.venueType === pref)?.id || 0,
        venueType: pref
      }))
      await updateUserPreferences(updatedPreferences)
      
      const crowdLevel = preferences.toleranceLevel === 'Baja' ? 33 : preferences.toleranceLevel === 'Media' ? 66 : 100
      const searchDistance = preferences.searchRange * 1000 // Convertir de km a metros
      
      await updateUserProfile({
        maxSearchDistance: searchDistance,
        preferredCrowdLevel: crowdLevel,
      })
      
      router.push('/home')
    } catch (error) {
      console.error("Error saving preferences:", error)
    }
  }

  if (status === 'loading') {
    return <div>Cargando...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Preferencias</h1>
      
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Ajustes generales</h2>
        <div className="mb-4">
          <h3 className="font-medium mb-2">Tolerancia a las multitudes</h3>
          <div className="flex justify-between">
            {['Baja', 'Media', 'Alta'].map((level) => (
              <button
                key={level}
                onClick={() => handleToleranceChange(level as 'Baja' | 'Media' | 'Alta')}
                className={`px-4 py-2 rounded ${preferences.toleranceLevel === level ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-medium mb-2">Rango de búsqueda</h3>
          <input
            type="range"
            min="1"
            max="30"
            value={preferences.searchRange}
            onChange={handleRangeChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>1 Km</span>
            <span>{preferences.searchRange} Km</span>
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
              onChange={() => handleToggle('travelWithPets')}
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
              onChange={() => handleToggle('avoidCrowds')}
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
              onChange={() => handleToggle('visitPointsOfInterest')}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">¿Qué te gustaría ver en el camino?</h2>
        <div className="grid grid-cols-2 gap-2">
          {['Parques y jardines', 'Museos', 'Monumentos', 'Edificios históricos'].map((pref) => (
            <button
              key={pref}
              onClick={() => handlePreferenceToggle(pref as Preference)}
              className={`px-4 py-2 rounded ${preferences.preferences.includes(pref as Preference) ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
            >
              {pref}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">¿Cómo te vas a desplazar?</h2>
        <div className="grid grid-cols-3 gap-2">
          {['A pie', 'Patinete', 'Vehículo', 'Bici', 'Transporte público'].map((mode) => (
            <button
              key={mode}
              onClick={() => handleTransportModeChange(mode as TransportMode)}
              className={`px-4 py-2 rounded ${preferences.transportMode === mode ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </section>

      <div className="flex justify-between">
        <button
          onClick={() => router.push('/home')}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Restablecer
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-pink-500 text-white rounded"
        >
          Aplicar cambios
        </button>
      </div>
    </div>
  )
}