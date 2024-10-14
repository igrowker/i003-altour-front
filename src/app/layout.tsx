import type { Metadata } from "next";
import "@/app/globals.css";
import { inter, lato } from "@/app/ui/fonts";
import "./globals.css";
import Navbar from "./components/Navbar/navbar";
import { Providers } from "./Providers";
import { usePathname } from "next/navigation";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export const metadata: Metadata = {
  title: "Altour | Turismo sostenible",
  description:
    "Aplicación web para recomendar lugares de interés en tiempo real en función de la afluencia de gente.",
  keywords: [
    "afluencia",
    "gente",
    "ocupacion",
    "interés",
    "lugares",
    "destinos",
    "viajes",
    "recomendaciones",
    "recomendación",
    "recomendar",
    "cercano",
    "mapa",
    "turismo",
    "ocio",
    "vacaciones",
    "viaje",
    "viajero",
    "turista",
  ],
  creator: "Altour",
  publisher: "Altour",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={lato.className}>
        <Providers>
          {children}
          {/* Contenedor de Toastify */}
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
          
          </Providers>
      </body>
    </html>
  );
}
