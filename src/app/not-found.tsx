import Image from "next/image";
import Link from "next/link";
import { YellowButton } from "./ui/button_yellow";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-evenly min-h-screen bg-gray-50 p-4 mt-15">
      <div className="flex flex-col items-center space-y-4 mt-4">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Oops, parece que nos perdimos...
        </h1>
        <p className="text-xl text-gray-800 text-center mx-2">
          No hemos podido encontrar la página que estás buscando. Pero no te
          preocupes, ¡aún puedes seguir explorando destinos increíbles!
        </p>
      </div>

      <div className="flex justify-center">
        <Image
          src="/not-found.png"
          width={350}
          height={350}
          alt="not-found-404"
          // className="mx-auto h-auto"
        />
      </div>

      <div className="flex flex-col space-y-14 w-full mb-4">
        <p className="text-xl mt-4 font-bold text-gray-900 text-center">
          ¿Qué te parece si volvemos atrás y descubrimos nuevos lugares juntos?
        </p>

        {/* <h5 className="text-m mt-4 font-bold text-gray-900 text-center">
          ¿Qué te parece si volvemos atrás y descubrimos nuevos lugares juntos?
        </h5> */}

        <YellowButton className="h-12 text-xl mx-4">
          <Link href="/" className="font-bold">
            Volver a explorar
          </Link>
        </YellowButton>
      </div>
      {/* </div> */}
    </div>
  );
}
