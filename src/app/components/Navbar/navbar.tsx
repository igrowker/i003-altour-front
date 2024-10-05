"use client";

import NavLinks from "./nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; 

export default function Navbar() {
  const router = useRouter();
/*   const pathname = usePathname(); */
/*   const hideNav = pathname === "/login" || pathname === "/register"; */

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url); // Redirigir a la página de inicio sin recargar
  };

/*   if (hideNav) {
    return null;
  } */

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-md z-10">
      <div className="flex justify-around items-center py-2 space-x-4">
        <NavLinks />
        {/* //TODO:añadir funcionalidad a "Sign Out" */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-gray-600 hover:text-blue-500"
        >
          <PowerIcon className="w-6 h-6" />
          <p className="text-xs mt-1">Sign Out</p>
        </button>
      </div>
    </nav>
  );
}
