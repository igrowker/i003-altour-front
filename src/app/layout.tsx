import "@/app/globals.css";
import { inter } from "@/app/ui/fonts";
import "./globals.css";
import Navbar from "./ui/navbar";
import { Providers } from "./Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
