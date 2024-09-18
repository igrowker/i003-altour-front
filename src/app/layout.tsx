import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { waffleSoft, lato } from "./ui/fonts";
import "./globals.css";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Altour",
  description: "Turismo sostenible",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        
      <Navbar />
        {children}
      
      </body>
    </html>
  );
}
