import { Lato } from "next/font/google";

export const lato = Lato({
    weight: ['400' ],
    subsets: ['latin']
})

import localFont from "next/font/local";

export const waffleSoft = localFont({src: './waffleSoft.otf' })