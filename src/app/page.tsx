
import altour from '../../public/altour.png';
import { waffleSoft, lato } from "./ui/fonts";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Carrusel from "./ui/carrousel";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
export default function Home() {
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

  return (
    <main className="flex min-h-screen flex-col p-6">

 
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to Altour.</strong> Turismo sostenible. Descubre
            todas las posibilidades.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
    </main>
  );
}
