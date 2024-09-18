import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { waffleSoft, lato } from "./ui/fonts";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Altour",
  description: "Turismo sostenible",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
