import '@/app/globals.css'
import {inter} from '@/app/ui/fonts'
import "./globals.css";
import SideNav from "./ui/sidenav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
      <SideNav />
      {children}
    </body>
  </html>
  );
}

