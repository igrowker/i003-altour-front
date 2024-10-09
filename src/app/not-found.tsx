import Image from "next/image";
import Link from "next/link";
import { YellowButton } from "./ui/button_yellow";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-xl font-bold text-gray-900">
        Oops! Parece que nos perdimos...
      </h1>
      <p className="text-xl mt-4 text-gray-700">
        No hemos podido encontrar la página que estás buscando. Pero no te
        preocupes, ¡aún puedes seguir explorando destinos increíbles!
      </p>
      <Image
        src="/not-found.png"
        width={300}
        height={300}
        alt="Altour"
        className="mb-4"
      />
      <h5 className="text-m mt-4 font-bold text-gray-900">
        ¿Qué te parece si volvemos atrás y descubrimos nuevos lugares juntos?
      </h5>
      <YellowButton>
        <Link href="/" className="font-bold">
          Volver a explorar
        </Link>
      </YellowButton>
    </div>
  );
}
