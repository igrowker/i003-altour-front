import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function Home() {
  let recomendaciones = [
    { id: 1, nombre: "La Sagrada Familia", descripcion: "La obra maestra inacabada de Antoni Gaudí es un icono mundial. Esta basílica, con sus torres y fachadas repletas de detalles, es una muestra impresionante del modernismo catalán. Cada rincón de la Sagrada Familia es una sorpresa visual, desde sus coloridas vidrieras hasta sus formas orgánicas inspiradas en la naturaleza)" },
    { id: 2, nombre: "Park Güell", descripcion: "Otro de los tesoros de Gaudí, el Park Güell es un parque público con un diseño extravagante y lleno de color. Sus mosaicos, bancos sinuosos y vistas panorámicas de la ciudad lo convierten en un lugar mágico para pasear y relajarse. El famoso dragón y la sala hipóstila son dos de sus puntos más destacados." },
    { id: 3, nombre: "Casa Batlló", descripcion: "Ubicada en el Paseo de Gracia, esta casa modernista es una de las obras más originales de Gaudí. Su fachada ondulante, revestida de cerámica de colores, y su interior lleno de simbolismo la convierten en una experiencia única. La Casa Batlló es como un cuento de hadas hecho realidad." },
    { id: 4, nombre: "Barrio Gótico", descripcion: "El corazón histórico de Barcelona, el Barrio Gótico, es un laberinto de callejuelas estrechas, plazas encantadoras y edificios medievales. Aquí puedes encontrar la Catedral de Barcelona, la Plaça Sant Jaume y el Palau Reial Major, entre otros monumentos. Perderse por sus callejuelas es una forma maravillosa de sumergirse en la historia de la ciudad." }
  ]

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex justify-center text-3xl">
        <h1>Bienvenido/a Usuario</h1>
      </div>
      <div className="flex justify-center mt-5">
        <div className="basis-1/6 flex justify-start items-center">
          <p className="text-2xl">Texto</p>
        </div>
        <div className="basis-5/6 flex justify-center items-center">
          <Image src="/isotipo_altour.png" alt="altour logo" width={300} height={200} />
        </div>
      </div>
      <div>
        <h2 className="text-3xl">Recomendaciones</h2>
        <div className="flex flex-wrap justify-between">
          {recomendaciones.map((recomendacion) => {
            return (
              <div key={recomendacion.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <Image src="/isotipo_altour.png" alt="altour logo" width={150} height={200} />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white" key={recomendacion.id}>{recomendacion.nombre}</h5>
                  </a>
                  <p className="mb-3 font-normal text-xs text-gray-700 dark:text-gray-400">{recomendacion.descripcion}</p>
                  <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Ver mas                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>



      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">

          <p className={`${lusitana} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Altour.</strong> Turismo sostenible. Descubre
            todas las posibilidades.
          </p>
          <Link href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
    </main>
  );
}
