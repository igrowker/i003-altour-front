import NextAuth from "next-auth";
//OAuth Google Authentication
import GoogleProvider from "next-auth/providers/google";

//Credentials Authentication
import CredentialsProvider from "next-auth/providers/credentials";
//import { compare } from "bcrypt" //TODO: Eliminar bcrypt si no es necesario después de integración.

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // FIXME: Añadir la lógica aquí para buscar el usuario en la base de datos y comparar las credenciales proporcionadas con el usuario de la BD
        const user = { id: "1", name: "John", email: credentials?.email }; //usuario hardcodeado - implementar lógica para buscar al usario en BD

        // Aquí puedes forzar el login siempre que pase
        // En lugar de interactuar con la API de backend
        if (credentials?.email && credentials?.password) {
          return user; // Simular un usuario autenticado
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirige al login si no está autenticado
  },

  // session: {
  //   strategy: "jwt",
  // },

  callbacks: {
    async session({ session, token }) {
      // Asigna token.user a session.user, asegurando que el tipo de token.user es correcto
      if (token?.user) {
        session.user = token.user as {
          name?: string | null;
          email?: string | null;
          image?: string | null;
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      // Si es la primera vez, añade el user al token
      if (user) {
        token.user = user;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
