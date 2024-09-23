
import { Lato } from "next/font/google";

export const lato = Lato({
    weight: ['400' ],
    subsets: ['latin']
})

import localFont from "next/font/local";

export const waffleSoft = localFont({src: './waffleSoft.otf' })

import { Inter } from 'next/font/google'
export const inter = Inter({ subsets: ["latin"]})

import { Lusitana } from "next/font/google";
export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});

