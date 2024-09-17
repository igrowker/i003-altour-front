import "@/app/globals.css";
import { inter } from "@/app/ui/fonts";
import "./globals.css";
import SideNav from "./ui/sidenav";
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
          <SideNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
