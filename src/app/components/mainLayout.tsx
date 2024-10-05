'use client'

import Navbar from "./Navbar/navbar";
import { usePathname } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbarPaths = ['/', '/onboarding', '/login', '/register']; // rutas donde no se tiene que ver el Navbar

  const showNavbar = !hideNavbarPaths.includes(pathname);

  return (
    <>
      {children}
      {showNavbar && <Navbar />}
    </>
  );
}