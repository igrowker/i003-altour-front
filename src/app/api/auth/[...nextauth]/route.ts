import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";

interface CustomUser extends User {
  token: string;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: CustomUser;
  }
}

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
        const loginUrl = `${process.env.API_URL}/auth/login`;

        if (!credentials) {
          throw new Error("Credentials are required");
        }

        try {
          // Hacer la solicitud al backend con las credenciales
          const res = await fetch(
            //TODO: cambiar la url de abajo por la variable: loginUrl
            "https://altour.onrender.com/api/v1/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const token = await res.text(); // Si la respuesta es solo un string
          console.log(token);

          if (!res.ok || !token) {
            throw new Error("Login failed");
          }

          // Devolver un objeto que extiende User, aquí usamos `CustomUser`
          return { token } as CustomUser;
        } catch (error) {
          console.error(error);
          throw new Error("Error during authentication");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.accessToken = customUser.token; // Guardamos el token en el JWT
      }
      return token;
    },

    async session({ session, token }) {
      if (typeof token.accessToken === "string") {
        session.accessToken = token.accessToken; // Pasamos el accessToken a la sesión si es string
      } else {
        session.accessToken = undefined; // Si no es un string, aseguramos que sea undefined
      }
      return session;
    },
  },
  // secret: process.env.AUTH_SECRET, // Asegúrate de que AUTH_SECRET esté configurado
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST };

//Si esperamos un JSON del backend:
// async authorize(credentials) {
//   //const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
//   if (!credentials) {
//     return null;
//   }
//   // Aquí haces la petición POST a tu backend con las credenciales
//   const res = await fetch("https://altour-1.onrender.com/api/v1/auth/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: credentials.email,
//       password: credentials.password,
//     }),
//   });

//   // Si la respuesta es exitosa, obtenemos el token y los datos del usuario
//   const user = await res.json(); // Esto falla si el servidor no devuelve JSON

//   if (res.ok && user) {
//     return user;
//   } else {
//     return null;
//   }
// },
// }),
// ],
