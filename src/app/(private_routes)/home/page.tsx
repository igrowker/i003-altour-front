'use client';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Carrusel from "../../ui/carrousel";
import Heatmap from "../../components/Heatmap/Heatmap";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana, waffleSoft, lato } from "@/app/ui/fonts";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { useRequest } from "@/app/hooks/useRequest"

interface UserData {
  username: string; 
 
}

export default function Home() {

 
  const router = useRouter();



  const { apiFetch } = useRequest()
  const { data: session, status } = useSession();

  const [userData, setUserData] = useState<UserData | null>(null);
 

  let recomendaciones = [
    { id: 1, nombre: "La Sagrada Familia", descripcion: "La obra maestra inacabada de Antoni Gaudí es un icono mundial. Esta basílica, con sus torres y fachadas repletas de detalles, es una muestra impresionante del modernismo catalán. Cada rincón de la Sagrada Familia es una sorpresa visual, desde sus coloridas vidrieras hasta sus formas orgánicas inspiradas en la naturaleza)" },
    { id: 2, nombre: "Park Güell", descripcion: "Otro de los tesoros de Gaudí, el Park Güell es un parque público con un diseño extravagante y lleno de color. Sus mosaicos, bancos sinuosos y vistas panorámicas de la ciudad lo convierten en un lugar mágico para pasear y relajarse. El famoso dragón y la sala hipóstila son dos de sus puntos más destacados." },
    { id: 3, nombre: "Casa Batlló", descripcion: "Ubicada en el Paseo de Gracia, esta casa modernista es una de las obras más originales de Gaudí. Su fachada ondulante, revestida de cerámica de colores, y su interior lleno de simbolismo la convierten en una experiencia única. La Casa Batlló es como un cuento de hadas hecho realidad." },
    { id: 4, nombre: "Barrio Gótico", descripcion: "El corazón histórico de Barcelona, el Barrio Gótico, es un laberinto de callejuelas estrechas, plazas encantadoras y edificios medievales. Aquí puedes encontrar la Catedral de Barcelona, la Plaça Sant Jaume y el Palau Reial Major, entre otros monumentos. Perderse por sus callejuelas es una forma maravillosa de sumergirse en la historia de la ciudad." },
    { id: 5, nombre: "Barrio Gótico", descripcion: "El corazón histórico de Barcelona, el Barrio Gótico, es un laberinto de callejuelas estrechas, plazas encantadoras y edificios medievales. Aquí puedes encontrar la Catedral de Barcelona, la Plaça Sant Jaume y el Palau Reial Major, entre otros monumentos. Perderse por sus callejuelas es una forma maravillosa de sumergirse en la historia de la ciudad." },
    { id: 6, nombre: "Barrio Gótico", descripcion: "El corazón histórico de Barcelona, el Barrio Gótico, es un laberinto de callejuelas estrechas, plazas encantadoras y edificios medievales. Aquí puedes encontrar la Catedral de Barcelona, la Plaça Sant Jaume y el Palau Reial Major, entre otros monumentos. Perderse por sus callejuelas es una forma maravillosa de sumergirse en la historia de la ciudad." }
  ]
  let categorias = [
    { id: 1, nombre: "Historia", descripcion: "Lugares inolvidables para la historia y para tí" },
    { id: 2, nombre: "Comida", descripcion: "Lo mejor de la gastronomía" }
  ]

  console.log('Access Token:', session?.accessToken)

  console.log('Access status:', status)
  useEffect(() => {
    if (session && !userData) {
      console.log('Access Token:', session?.accessToken);
      const fetchData = async () => {
        try {
          const data = await apiFetch({
            url: `/users/profile/`,
            method: "GET",
            token: session?.accessToken,
            headers: {
              "Content-Type": "application/json",
            },
          });
          setUserData(data);  // Almacena los datos del usuario en el estado
          console.log("Info del usuario:", data);
        } catch (error) {
          console.error("Error en el registro:", error);
        }
      };

      fetchData();
    }
  }, [session, status, apiFetch, userData]);

  return (


    <main className="flex min-h-screen flex-col p-6 pb-12 mb-7">
      <div className="flex justify-center text-3xl">
      {userData ? <h1>Bienvenido {userData.username}</h1> : <h1>Bienvenido/a Usuario</h1>}
      </div>
      <div className="flex justify-center mt-5" >
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-full h-full">
          <Heatmap 
            searchAndCard={false}
            containerStyle={{ width: '100%', height: '200px' }} 
          />
          </div>
        </div>
      </div>

      <div>
        <h2 className={`${waffleSoft.className} text-2xl pl-4 mb-2`}>Recomendaciones</h2>
        <Carrusel slides={recomendaciones} />
      </div>
      <div>
        <h2 className={`${waffleSoft.className} text-2xl pl-4 mb-2`}>Categorías</h2>
        <Carrusel slides={categorias} />
      </div>
    </main>
  );}