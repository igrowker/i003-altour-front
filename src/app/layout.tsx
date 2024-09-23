
import type { Metadata } from "next";
import { waffleSoft, lato } from "./ui/fonts";
import "./globals.css";
import Navbar from "./components/navbar";
import { Providers } from "./Providers";

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
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
