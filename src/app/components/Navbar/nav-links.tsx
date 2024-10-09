"use client";

import {
  UserIcon,
  MapIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  EyeIcon
} from "@heroicons/react/24/outline";


import Link from "next/link";
import Image from "next/image";

const logo = "/isotipo_altour.png";

//TODO: User: profile/login (si está logeado / si no)
const links = [
  { name: "Explore", href: "/explore", icon: logo }, // El logo es una imagen
  { name: "Search", href: "/search", icon: MagnifyingGlassIcon },
  { name: "Favorites", href: "/favorites", icon: HeartIcon }, 
  { name: "Map", href: "/heatmap", icon: MapIcon },
  { name: "User", href: "/profile", icon: UserIcon },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex flex-col items-center text-gray-600 hover:text-blue-500"
          >
            {/* Comprobamos si el icono es una cadena (imagen) o un componente */}
            {typeof link.icon === "string" ? (
              <Image
                src={link.icon}
                alt={`${link.name} logo`}
                width={36}
                height={36}
                className="w-8 h-8"
              />
            ) : (
              <link.icon className="w-6 h-6" />
            )}
             <p className="text-xs mt-1">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}