//FIXME: es necesario este archivo para el auth? o con la config de route.ts es suficiente?

import NextAuth from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})

